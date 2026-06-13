/**
 * WhosFakeApp.tsx
 *
 * Top-level UI + client-side processing pipeline for an Instagram data export.
 *
 * Security model (NIST CSF):
 *   PR.AC-4 / PR.DS-5  All processing is local; the app never makes a network
 *                      request with user data (enforced by CSP `connect-src 'self'`).
 *   PR.IP-1            Strict whitelists for file extension, file size, ZIP
 *                      entry size and ZIP entry path prevent malformed or
 *                      hostile uploads from reaching the parser.
 *   DE.CM-4            Detected violations short-circuit processing and surface
 *                      a non-leaky error message to the user.
 */

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import JSZip from "jszip";
import {
  analyzeFollowersAndFollowing,
  InvalidInstagramDataError,
} from "../analysis";
import FileList from "../components/FileList";
import NavBar from "../components/NavBar";
import ProgressBar from "../components/ProgressBar";
import ResultsTable from "../components/ResultsTable";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import FirstTimeModal from "../components/FirstTimeModal";

// ---------------------------------------------------------------------------
// First-time UX helpers — mobile detection + dismissible/collapsible state.
// All localStorage access is wrapped so private-mode browsers never throw.
// None of this touches the upload, validation, or processing pipeline below.
// ---------------------------------------------------------------------------

const MOBILE_BANNER_KEY = "whosfake_mobile_banner_dismissed";
const DATA_STEPS_KEY = "whosfake_data_steps_collapsed";

function lsGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function lsSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode / storage disabled — ignore */
  }
}

/** True on phones/tablets: narrow viewport OR a mobile user-agent. */
function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  const narrow = window.innerWidth < 768;
  const ua = /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  return narrow || ua;
}

// --- Styles for the new first-time UX elements (match the app's theme). ---

const mobileBannerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: "#eef2ff",
  border: "1px solid #c7d2fe",
  borderRadius: 14,
  padding: "12px 14px",
  margin: "0 0 18px",
  boxSizing: "border-box",
};

const bannerCloseStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 30,
  height: 30,
  lineHeight: "24px",
  borderRadius: 8,
  border: "1px solid #c7d2fe",
  background: "#fff",
  color: "#4338ca",
  fontSize: "1.25rem",
  cursor: "pointer",
  padding: 0,
};

const accordionCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  boxShadow: "0 12px 36px rgba(0,0,0,0.10)",
  maxWidth: 800,
  width: "100%",
  margin: "0 auto 18px",
  boxSizing: "border-box",
  padding: "clamp(14px, 2.5vw, 22px) clamp(16px, 3vw, 26px)",
  textAlign: "left",
};

const accordionHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  width: "100%",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  textAlign: "left",
};

const chevronStyle: React.CSSProperties = {
  fontSize: "1.7rem",
  lineHeight: 1,
  color: "#6d64e8",
  transition: "transform 0.28s ease",
  flexShrink: 0,
};

const stepsListStyle: React.CSSProperties = {
  margin: "14px 0 0",
  paddingLeft: "1.3rem",
  color: "#374151",
};

const stepStyle: React.CSSProperties = {
  fontSize: "0.98rem",
  lineHeight: 1.6,
  marginBottom: 8,
};

const proTipStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  background: "#fffbeb",
  border: "1px solid #fde68a",
  borderLeft: "4px solid #f59e0b",
  borderRadius: 10,
  padding: "12px 14px",
  margin: "14px 0 4px",
};

const zipHelpToggleStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#6d64e8",
  cursor: "pointer",
  fontSize: "0.92rem",
  fontWeight: 600,
  textDecoration: "underline",
  padding: "6px 0",
};

const zipHelpTextStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "0.9rem",
  lineHeight: 1.6,
  textAlign: "left",
  maxWidth: 520,
  margin: "6px auto 8px",
  background: "#f8faff",
  border: "1px solid #eef2ff",
  borderRadius: 10,
  padding: "10px 14px",
};

const resultsContextStyle: React.CSSProperties = {
  background: "#f5f3ff",
  border: "1px solid #e0e7ff",
  borderRadius: 12,
  padding: "12px 16px",
  margin: "0 0 6px",
  color: "#4338ca",
  fontSize: "0.95rem",
  lineHeight: 1.55,
  textAlign: "left",
};

// ---------------------------------------------------------------------------
// File-level safety limits.  These are intentionally generous for real-world
// Instagram exports while preventing pathological inputs (zip bombs, multi-GB
// JSON blobs) from exhausting browser memory.
// ---------------------------------------------------------------------------

/** Largest ZIP archive we will open. */
const MAX_ZIP_BYTES = 200 * 1024 * 1024;        // 200 MB
/** Largest individual JSON file (loose upload or extracted from a ZIP). */
const MAX_JSON_BYTES = 64 * 1024 * 1024;        //  64 MB
/** Largest single file in any drag-and-drop selection. */
const MAX_FILE_BYTES = MAX_ZIP_BYTES;
/** Total bytes across the entire selection. */
const MAX_TOTAL_BYTES = 256 * 1024 * 1024;      // 256 MB
/** Hard cap on number of files in a selection (anti-DoS for the renderer). */
const MAX_FILE_COUNT = 5_000;
/** Allowed extensions; checked case-insensitively. */
const ALLOWED_EXTENSIONS = [".zip", ".json"] as const;
/**
 * MIME types we will accept for ZIP uploads.  Browsers vary; empty string is
 * allowed because Safari/Firefox often return "" for unknown types.
 */
const ALLOWED_ZIP_MIME = new Set([
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
  "",
]);
const ALLOWED_JSON_MIME = new Set([
  "application/json",
  "text/json",
  "text/plain",
  "application/octet-stream",
  "",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const supportedTypes: string[] = [...ALLOWED_EXTENSIONS];

/** Lowercase the trailing extension (incl. the dot) of a file name. */
function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot).toLowerCase();
}

/** True if a file's extension is on the allow-list. */
function hasAllowedExtension(name: string): boolean {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(fileExtension(name));
}

/**
 * Validate a single user-selected File.  Returns null on success or a short,
 * user-safe error string on failure.  We deliberately don't echo the raw file
 * name back to the user verbatim in case the export was tampered with.
 */
function validateFile(file: File): string | null {
  if (file.size === 0) return "File is empty.";
  if (file.size > MAX_FILE_BYTES) {
    return `File exceeds the ${Math.round(MAX_FILE_BYTES / (1024 * 1024))} MB limit.`;
  }
  const ext = fileExtension(file.name);
  if (!hasAllowedExtension(file.name)) {
    return "Unsupported file type — only .zip and .json are accepted.";
  }
  if (ext === ".zip" && !ALLOWED_ZIP_MIME.has(file.type)) {
    return "File does not appear to be a valid ZIP archive.";
  }
  if (ext === ".json" && !ALLOWED_JSON_MIME.has(file.type)) {
    return "File does not appear to be valid JSON.";
  }
  // Defensive: reject names containing path separators or NUL bytes.
  if (/[\/\\\x00]/.test(file.name)) return "Invalid file name.";
  return null;
}

/**
 * ZIP entries arrive with attacker-controlled paths.  Reject anything that
 * looks like path traversal, an absolute path, or an unreasonable length —
 * JSZip itself doesn't write to disk, but downstream consumers (and future
 * features) may, and the check is essentially free.
 */
function isSafeZipEntryName(name: string): boolean {
  if (!name || name.length > 1024) return false;
  if (name.includes("\x00")) return false;
  if (name.startsWith("/") || name.startsWith("\\")) return false;
  if (/(^|\/)\.\.(\/|$)/.test(name)) return false;
  // Reject Windows-style absolute paths e.g. "C:\foo".
  if (/^[a-zA-Z]:[\\/]/.test(name)) return false;
  return true;
}

// Utility for formatting file sizes in the UI.
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Validate that an account record (post-parse) is renderable.  Note: URL
 * validity is enforced again at render time by `toAbsoluteUrl` in
 * ResultsTable; this is just a coarse first pass.
 */
const isValidAccount = (user: { username?: string; profileUrl?: string }): boolean => {
  if (!user.username || user.username.trim() === "") return false;
  if (!user.profileUrl || !user.profileUrl.includes("instagram.com")) return false;
  const username = user.username.toLowerCase();
  if (username === "instagram user" || username === "unknown" || username === "deleted") return false;
  return true;
};

// Normalize Instagram profile links by removing the leading protocol/www and
// collapsing the `/_u/` redirect that some exports include.
const trimInstagramPrefix = (url: string): string => {
  return (url || "").replace(/^https?:\/\/www\./i, "").replace(/\/_u\//i, "/");
};

// ---------------------------------------------------------------------------
// Drag-and-drop directory walker (Chromium / Webkit).  Each File goes through
// the same validateFile() gate before being added to state.
// ---------------------------------------------------------------------------

async function getAllFilesFromDataTransferItems(items: DataTransferItemList): Promise<File[]> {
  const files: File[] = [];
  const traverseFileTree = async (item: any, path = "") => {
    if (item.isFile) {
      await new Promise<void>((resolve) => {
        item.file((file: File) => {
          if (path) Object.defineProperty(file, "webkitRelativePath", { value: path + file.name });
          files.push(file);
          resolve();
        });
      });
    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      await new Promise<void>((resolve) => {
        const readEntries = () => {
          dirReader.readEntries(async (entries: any[]) => {
            if (!entries.length) {
              resolve();
              return;
            }
            for (const entry of entries) {
              await traverseFileTree(entry, path + item.name + "/");
            }
            readEntries();
          });
        };
        readEntries();
      });
    }
  };
  const entries: any[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
    if (entry) entries.push(entry);
  }
  for (const entry of entries) {
    await traverseFileTree(entry);
  }
  return files;
}

// ===========================================================================
// Component
// ===========================================================================

export default function Tool() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // First-time UX state (purely presentational — does not affect processing).
  const [isMobile, setIsMobile] = useState<boolean>(detectMobile);
  const [mobileBannerDismissed, setMobileBannerDismissed] = useState<boolean>(
    () => lsGet(MOBILE_BANNER_KEY) === "1"
  );
  // Expanded by default on first visit; collapse choice is remembered.
  const [dataStepsOpen, setDataStepsOpen] = useState<boolean>(
    () => lsGet(DATA_STEPS_KEY) !== "1"
  );
  const [zipHelpOpen, setZipHelpOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(detectMobile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const dismissMobileBanner = () => {
    setMobileBannerDismissed(true);
    lsSet(MOBILE_BANNER_KEY, "1");
  };

  const toggleDataSteps = () => {
    setDataStepsOpen((open) => {
      // `open` is the current (pre-toggle) value; persist the NEXT state.
      lsSet(DATA_STEPS_KEY, open ? "1" : "0");
      return !open;
    });
  };

  /**
   * Merge a batch of newly-selected files into `selectedFiles`, after running
   * each file through `validateFile`.  Anything that fails validation is
   * reported via `errorText` and not added.
   */
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    setErrorText(null);
    const incoming = Array.from(files).filter((f) => f.name !== ".DS_Store");
    const accepted: File[] = [];
    const rejected: string[] = [];
    for (const f of incoming) {
      const err = validateFile(f);
      if (err) {
        rejected.push(`${f.name}: ${err}`);
        continue;
      }
      accepted.push(f);
    }
    setSelectedFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      const merged = [
        ...prev,
        ...accepted.filter((f) => !names.has(f.name)),
      ].filter((f) => f.name !== ".DS_Store");
      // Cap the selection size to keep the UI / processor responsive.
      if (merged.length > MAX_FILE_COUNT) {
        rejected.push(`Too many files; truncated to ${MAX_FILE_COUNT}.`);
        return merged.slice(0, MAX_FILE_COUNT);
      }
      const total = merged.reduce((acc, f) => acc + f.size, 0);
      if (total > MAX_TOTAL_BYTES) {
        rejected.push("Selection exceeds total size limit.");
        return prev; // reject the whole new batch rather than partially apply
      }
      return merged;
    });
    if (rejected.length) setErrorText(rejected.join(" "));
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    setErrorText(null);
    const items = e.dataTransfer.items;
    if (items && items.length && items[0].webkitGetAsEntry()) {
      const allFiles = await getAllFilesFromDataTransferItems(items);
      // Push through the same validating path as handleFileSelect.
      const dt = new DataTransfer();
      for (const f of allFiles) dt.items.add(f);
      handleFileSelect(dt.files);
    } else {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // -----------------------------------------------------------------------
  // Display + validation flags
  // -----------------------------------------------------------------------

  let displayFiles: File[] = [];
  let isTopLevelFolder = false;
  if (selectedFiles.some((f) => f.name.toLowerCase().endsWith(".zip"))) {
    const zip = selectedFiles.find((f) => f.name.toLowerCase().endsWith(".zip"));
    if (zip) displayFiles = [zip];
  } else if (selectedFiles.length > 0) {
    if ((selectedFiles[0] as any).webkitRelativePath) {
      displayFiles = selectedFiles;
      isTopLevelFolder = true;
    } else {
      displayFiles = selectedFiles;
    }
  }

  const hasUnsupported = displayFiles.some((file) => {
    if (isTopLevelFolder) return !file.name.toLowerCase().endsWith(".json");
    return !hasAllowedExtension(file.name);
  });

  // -----------------------------------------------------------------------
  // Main processing pipeline
  // -----------------------------------------------------------------------

  /** Read a JSZip file entry as a string with a hard byte cap. */
  async function readZipEntryString(
    entry: JSZip.JSZipObject,
    maxBytes: number
  ): Promise<string> {
    const bytes = await entry.async("uint8array");
    if (bytes.byteLength > maxBytes) {
      throw new InvalidInstagramDataError(
        `Embedded file ${entry.name} is larger than the ${maxBytes} byte limit.`
      );
    }
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  }

  /** Read a loose File as text with a hard byte cap. */
  async function readFileString(file: File, maxBytes: number): Promise<string> {
    if (file.size > maxBytes) {
      throw new InvalidInstagramDataError(
        `${file.name} exceeds the ${maxBytes} byte limit.`
      );
    }
    return await file.text();
  }

  /**
   * Wrap JSON.parse to give us a clean error type and a length cap.
   */
  function safeJsonParse(text: string): unknown {
    if (text.length > MAX_JSON_BYTES) {
      throw new InvalidInstagramDataError("JSON file too large to process.");
    }
    try {
      return JSON.parse(text);
    } catch {
      throw new InvalidInstagramDataError("File is not valid JSON.");
    }
  }

  const handleProcess = async () => {
    setProcessing(true);
    setProgress(0);
    setErrorText(null);
    setProgressText("Reading your file...");
    try {
      // -----------------------------------------------------------------
      // ZIP path
      // -----------------------------------------------------------------
      const zipFile = selectedFiles.find((f) => f.name.toLowerCase().endsWith(".zip"));
      if (zipFile) {
        const fileErr = validateFile(zipFile);
        if (fileErr) throw new InvalidInstagramDataError(fileErr);
        if (zipFile.size > MAX_ZIP_BYTES) {
          throw new InvalidInstagramDataError("ZIP file exceeds the allowed size.");
        }

        setProgress(20);
        setProgressText("Reading your ZIP file...");
        const zip = await JSZip.loadAsync(zipFile);

        setProgress(40);
        setProgressText("Looking for your followers & following lists...");

        // Filter and validate ZIP entries.  Reject path-traversal attempts.
        const zipFileKeys = Object.keys(zip.files).filter((k) => {
          if (k.includes(".DS_Store")) return false;
          if (!isSafeZipEntryName(k)) {
            console.warn("Rejected unsafe ZIP entry:", k);
            return false;
          }
          return true;
        });

        const followersPath = zipFileKeys.find((k) =>
          k.match(/followers_and_following\/followers_1\.json$/)
        );
        const followingPath = zipFileKeys.find((k) =>
          k.match(/followers_and_following\/following\.json$/)
        );
        if (!followersPath || !followingPath) {
          throw new InvalidInstagramDataError(
            "Could not find followers or following file in ZIP."
          );
        }

        setProgress(55);
        setProgressText("Found your followers and following lists ✅");

        const followersContent = await readZipEntryString(
          zip.files[followersPath],
          MAX_JSON_BYTES
        );
        const followingContent = await readZipEntryString(
          zip.files[followingPath],
          MAX_JSON_BYTES
        );

        setProgress(60);
        setProgressText("Comparing your lists...");
        const { followers, following, unfollowers: rawUnfollowers } =
          analyzeFollowersAndFollowing(
            safeJsonParse(followersContent),
            safeJsonParse(followingContent)
          );
        const unfollowers = rawUnfollowers
          .map((u) => ({ ...u, profileUrl: trimInstagramPrefix(u.profileUrl) }))
          .filter(isValidAccount);

        setProgress(100);
        setProgressText("Done!");
        setResults({
          summary: {
            totalFollowers: followers.length,
            totalFollowing: following.length,
            unfollowers: unfollowers.length,
          },
          unfollowers,
        });
        setProcessing(false);
        return;
      }

      // -----------------------------------------------------------------
      // Loose-folder path
      // -----------------------------------------------------------------
      const followersFile = selectedFiles.find(
        (f) =>
          (f as any).webkitRelativePath &&
          (f as any).webkitRelativePath.match(
            /followers_and_following\/followers_1\.json$/
          )
      );
      const followingFile = selectedFiles.find(
        (f) =>
          (f as any).webkitRelativePath &&
          (f as any).webkitRelativePath.match(
            /followers_and_following\/following\.json$/
          )
      );
      if (!followersFile || !followingFile) {
        throw new InvalidInstagramDataError(
          "Could not find followers or following file in folder."
        );
      }
      const followersErr = validateFile(followersFile);
      const followingErr = validateFile(followingFile);
      if (followersErr) throw new InvalidInstagramDataError(followersErr);
      if (followingErr) throw new InvalidInstagramDataError(followingErr);

      setProgress(40);
      setProgressText("Found your followers and following lists ✅");
      const followersContent = await readFileString(followersFile, MAX_JSON_BYTES);
      const followingContent = await readFileString(followingFile, MAX_JSON_BYTES);

      setProgress(60);
      setProgressText("Comparing your lists...");
      const { followers, following, unfollowers: rawUnfollowers } =
        analyzeFollowersAndFollowing(
          safeJsonParse(followersContent),
          safeJsonParse(followingContent)
        );
      const unfollowers = rawUnfollowers
        .map((u) => ({ ...u, profileUrl: trimInstagramPrefix(u.profileUrl) }))
        .filter(isValidAccount);

      setProgress(100);
      setProgressText("Done!");
      setResults({
        summary: {
          totalFollowers: followers.length,
          totalFollowing: following.length,
          unfollowers: unfollowers.length,
        },
        unfollowers,
      });
    } catch (err) {
      // Surface a friendly message; log the raw error for the developer only.
      console.error("Processing error:", err);
      const msg =
        err instanceof InvalidInstagramDataError
          ? err.message
          : "Error processing file. Please check that you uploaded the correct Instagram export.";
      setProgressText(msg);
      setErrorText(msg);
      setResults(null);
    }
    setProcessing(false);
  };

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <>
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "100vh",
          height: "auto",
          color: "#333",
          width: "100vw",
          minWidth: 0,
          position: "relative",
          overflowX: "clip",
        }}
      >
        <Seo
          title="Instagram Unfollower Checker — WhosFake Insights"
          description="Upload your Instagram data export and instantly see who isn't following you back. 100% private — all processing happens in your browser."
          path="/tool"
        />
        <FirstTimeModal />
        <NavBar />
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "clamp(112px, 12vw, 140px) 2vw 160px",
            width: "100%",
            boxSizing: "border-box",
            minHeight: "100vh",
          }}
        >
          {isMobile && !mobileBannerDismissed && (
            <div style={{ maxWidth: 800, margin: "0 auto", paddingTop: "2vw" }}>
              <div style={mobileBannerStyle}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>💻</span>
                <p
                  style={{
                    margin: 0,
                    flex: 1,
                    color: "#3730a3",
                    fontSize: "0.95rem",
                    lineHeight: 1.5,
                    textAlign: "left",
                  }}
                >
                  This tool is easiest to use on a computer. You can still use it on
                  your phone, but downloading and uploading your Instagram ZIP file
                  is simpler on desktop.
                </p>
                <button
                  type="button"
                  onClick={dismissMobileBanner}
                  aria-label="Dismiss banner"
                  style={bannerCloseStyle}
                >
                  ×
                </button>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center", marginBottom: "2vw" }}>
            <h1
              style={{
                color: "white",
                fontSize: "clamp(1.9rem, 5vw, 3rem)",
                fontWeight: 800,
                marginBottom: 12,
                textShadow: "0 2px 12px rgba(0,0,0,0.25)",
              }}
            >
              Instagram Unfollower Checker
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "clamp(1.02rem, 2.5vw, 1.2rem)",
                maxWidth: 620,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Upload your Instagram data export to see who isn't following you back.
            </p>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* "How to get your data" accordion — expanded by default, collapsible */}
          {/* ----------------------------------------------------------------- */}
          <div style={accordionCardStyle}>
            <button
              type="button"
              onClick={toggleDataSteps}
              aria-expanded={dataStepsOpen}
              style={accordionHeaderStyle}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
                  color: "#4338ca",
                }}
              >
                📥 Don't have your Instagram data yet? Start here
              </span>
              <span
                style={{
                  ...chevronStyle,
                  transform: dataStepsOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {/* Smooth expand/collapse via grid-template-rows 1fr <-> 0fr. */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: dataStepsOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <ol style={stepsListStyle}>
                  <li style={stepStyle}>
                    Open Instagram → <strong>Settings</strong> →{" "}
                    <strong>Accounts Center</strong> →{" "}
                    <strong>Your information and permissions</strong>
                  </li>
                  <li style={stepStyle}>
                    Tap <strong>"Export your information"</strong> →{" "}
                    <strong>"Create export"</strong> →{" "}
                    <strong>"Export to device"</strong>
                  </li>
                  <li style={stepStyle}>
                    Set <strong>format to JSON</strong>,{" "}
                    <strong>range to All time</strong>
                  </li>
                </ol>

                {/* Pro tip callout — visually distinct from the numbered steps. */}
                <div style={proTipStyle}>
                  <span style={{ fontSize: "1.15rem", lineHeight: 1 }} aria-hidden="true">
                    ⚡
                  </span>
                  <p
                    style={{
                      margin: 0,
                      color: "#92670a",
                      fontSize: "0.92rem",
                      lineHeight: 1.55,
                      textAlign: "left",
                    }}
                  >
                    <strong>Pro tip:</strong> On the information selection screen,
                    select only <strong>"Followers and Following"</strong> for a much
                    faster download. Instagram will send your data in minutes instead
                    of hours.
                  </p>
                </div>

                <ol start={4} style={stepsListStyle}>
                  <li style={stepStyle}>
                    Instagram emails you a download link (this can take a few minutes
                    to a few hours)
                  </li>
                  <li style={stepStyle}>Download the ZIP file Instagram sends you</li>
                  <li style={stepStyle}>
                    Come back here and upload that ZIP file below ⬇️
                  </li>
                </ol>

                <p style={{ margin: "14px 0 4px", textAlign: "left", fontSize: "0.95rem", color: "#374151" }}>
                  Want the full walkthrough with screenshots and video?{" "}
                  <Link
                    to="/tutorial"
                    style={{ color: "#6d64e8", fontWeight: 700, textDecoration: "underline" }}
                  >
                    View the complete tutorial →
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 24,
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              padding: "4vw 2vw",
              margin: "4vw auto",
              maxWidth: 800,
              minWidth: 0,
              width: "100%",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                border: "3px dashed #e0e7ff",
                borderRadius: 16,
                padding: "4vw 2vw",
                margin: "2vw 0",
                background: dragOver ? "#e0e7ff" : "#f8faff",
                cursor: "pointer",
                transition: "all 0.3s",
                position: "relative",
                minWidth: 0,
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ fontSize: "4rem", color: "#667eea", marginBottom: 20 }}>📁</div>
              <div>
                <h3 style={{ fontSize: "1.8rem", color: "#333", marginBottom: 10, fontWeight: 600 }}>
                  Upload Your Instagram Data
                </h3>
                <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: 8 }}>
                  Drag and drop your Instagram ZIP file here, or click to browse
                </p>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    maxWidth: 440,
                    margin: "0 auto 20px",
                  }}
                >
                  This is the .zip file Instagram emailed or will email you. No need to unzip it,
                  just upload it as-is.
                </p>
                <button
                  className="choose-files-btn"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    padding: "16px 32px",
                    borderRadius: 12,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip,.json,application/zip,application/json"
                  multiple
                  style={{ display: "none" }}
                  // @ts-ignore
                  webkitdirectory="true"
                  directory="true"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
              </div>
            </div>
            {/* "What's a ZIP file?" inline explainer near the upload box. */}
            <div style={{ textAlign: "center", margin: "0 0 4px" }}>
              <button
                type="button"
                onClick={() => setZipHelpOpen((o) => !o)}
                aria-expanded={zipHelpOpen}
                style={zipHelpToggleStyle}
              >
                What's a ZIP file?
              </button>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: zipHelpOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.28s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p style={zipHelpTextStyle}>
                    A ZIP file is a compressed folder. When you request your data,
                    Instagram sends you a download link for a file ending in .zip; all you need
                    to do is upload that file directly here, you don't need to open or
                    extract it.
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#f0f9ff",
                border: "1px solid #e0f2fe",
                borderRadius: 12,
                padding: "2vw",
                margin: "2vw 0",
                display: "flex",
                alignItems: "center",
                gap: 15,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: "2rem", color: "#0ea5e9" }}>🔒</div>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ color: "#0c4a6e", marginBottom: 5, fontWeight: 600 }}>
                  100% Private &amp; Secure
                </h4>
                <p style={{ color: "#0369a1", fontSize: "0.95rem" }}>
                  All processing happens on your device. No files are uploaded to our servers.
                </p>
              </div>
            </div>
            {errorText && (
              <div
                role="alert"
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  padding: "1vw",
                  margin: "1vw 0",
                  color: "#991b1b",
                  textAlign: "left",
                }}
              >
                {errorText}
              </div>
            )}
            <FileList
              selectedFiles={displayFiles}
              supportedTypes={supportedTypes}
              formatFileSize={formatFileSize}
              handleRemoveFile={handleRemoveFile}
              setSelectedFiles={setSelectedFiles}
              hasUnsupported={hasUnsupported}
              handleProcess={handleProcess}
            />
            {processing && <ProgressBar progress={progress} progressText={progressText} />}
            {results && (
              <>
                <p style={resultsContextStyle}>
                  These are accounts you follow that don't follow you back. Click any
                  username to visit their profile, or use the buttons to manage your
                  list.
                </p>
                <ResultsTable results={results} showNotice={true} />
              </>
            )}
            {!results && !processing && (
              <>
                <div style={{ marginTop: '3vw', opacity: 0.6 }}>
                  {/* Label area — not interactive */}
                  <div style={{ textAlign: 'center', marginBottom: '1rem', pointerEvents: 'none', userSelect: 'none' }}>
                    <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '1.5vw' }}>
                      This is a preview of the results table. Upload your Instagram data to see real results!
                      <br />
                      *Links in the table will take you directly to each user's Instagram profiles.
                    </p>
                    <span style={{ background: '#e0e7ff', color: '#4338ca', borderRadius: 8, padding: '4px 14px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 1 }}>PREVIEW — Upload your file to see real results</span>
                  </div>
                  {/* Table keeps pointer-events so horizontal scroll works on mobile */}
                  <ResultsTable results={{
                    summary: { totalFollowers: 73, totalFollowing: 76, unfollowers: 3 },
                    unfollowers: [
                      { username: 'example.user1', profileUrl: 'instagram.com/example.user1', timestamp: 1700000000 },
                      { username: 'example.user2', profileUrl: 'instagram.com/example.user2', timestamp: 1710000000 },
                      { username: 'example.user3', profileUrl: 'instagram.com/example.user3', timestamp: 1720000000 },
                    ]
                  }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <Link
                    to="/tutorial"
                    style={{
                      display: 'inline-block',
                      color: '#6d64e8',
                      border: '1.5px solid #6d64e8',
                      borderRadius: 10,
                      padding: '10px 22px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = '#6d64e8';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#6d64e8';
                    }}
                  >
                    Need help? View the step-by-step tutorial →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
