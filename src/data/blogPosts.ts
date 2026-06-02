/**
 * blogPosts.ts
 *
 * Static content store for the WhosFake Insights blog. Each post is plain
 * data — no network calls, no CMS. The `content` field is lightweight
 * Markdown rendered safely (no dangerouslySetInnerHTML) by the renderer in
 * components/Markdown.tsx.
 */

export interface BlogPost {
  slug: string;
  title: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  /** Markdown body. Rendered to React nodes by <Markdown />. */
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-people-unfollow",
    title: "Why People Unfollow on Instagram: 10 Common Reasons",
    readTime: "4 min read",
    publishDate: "May 21, 2026",
    excerpt:
      "Understanding why people unfollow is the first step to building an audience that actually sticks around.",
    content: `You put effort into your Instagram posts, you engage with your followers, and yet your follower count keeps quietly dipping. Sound familiar?

Understanding why people unfollow is the first step to building an audience that actually sticks around. Here are the 10 most common reasons people hit that unfollow button and what you can do about each one.

## 1. You Post Too Much

Flooding someone's feed is one of the fastest ways to lose them. When you post multiple times a day, every day, followers start to feel overwhelmed. Instagram's algorithm already filters what people see, but if you're posting so frequently that you're dominating their feed, unfollows follow quickly.

**What to do:** Find a sustainable posting rhythm. For most accounts, 3-5 posts per week is the sweet spot. Consistency matters more than volume.

## 2. You Don't Post Enough

The opposite problem is just as real. If someone followed you expecting regular content and you disappear for weeks or months, they may clean up their following list and unfollow you since you are not posting.

**What to do:** Even one post a week keeps you visible and relevant. Stories are even easier. A quick daily Story keeps your account active without requiring polished content.

## 3. Your Content Changed

People follow accounts for a reason. If you started as a fitness account and slowly shifted to political opinions, food photos, and travel content, your original audience has no reason to stay.

**What to do:** Pick a lane and stay in it. If your content is evolving, do it gradually and let your audience come along for the ride rather than pivoting suddenly.

## 4. You Follow/Unfollow to Game the Numbers

The follow/unfollow strategy, following someone to get a follow-back, then unfollowing them, is widely used and widely despised. Most Instagram users know what it looks like and will unfollow you the moment they realize what you're doing.

**What to do:** Only follow accounts you genuinely want to see content from. Authentic engagement builds a real audience. Gaming the numbers builds a hollow one.

## 5. Your Posts Feel Like Ads

Nobody follows an account to be sold to constantly. If every post is a promotion, an affiliate link, or a sponsored partnership, your followers will tune out fast. Instagram's own data shows that overly promotional content is one of the top reasons people unfollow brand accounts.

**What to do:** Follow the 80/20 rule: 80% genuine, valuable, entertaining content and 20% promotional. Even then, make your promotional posts feel native and authentic rather than copy-pasted ad copy.

## 6. Low Quality Visuals

Instagram is a visual platform. Blurry photos, inconsistent aesthetics, or poorly designed graphics signal low effort. Followers who are used to high-quality content from other accounts will quietly move on.

**What to do:** You don't need professional photography equipment. Good lighting, a clean background, and a consistent color palette go a long way. Apps like Lightroom Mobile (free) let you apply the same preset to every photo for a cohesive feed.

## 7. No Engagement Back

Social media is supposed to be social. If someone comments on your posts regularly and you never respond, never like their content, and never acknowledge them, the relationship feels one-sided. Over time they'll stop engaging and eventually unfollow.

**What to do:** Reply to comments, especially in the first hour after posting when engagement matters most for the algorithm. Spend 15 minutes a day engaging with accounts in your niche. It compounds over time.

## 8. Controversial or Negative Content

People follow accounts that make them feel good. If your content is consistently negative, argumentative, or controversial, even followers who agreed with you at first will start to feel drained by it.

**What to do:** This doesn't mean being fake or avoiding all opinions. It means being intentional about the energy your content puts out. Ask yourself whether each post adds value or just adds noise.

## 9. They're Doing a Following Purge

Sometimes it has nothing to do with you. Many Instagram users periodically clean up their following list: unfollowing accounts they followed years ago, inactive accounts, or people they no longer know in real life. You might be caught in a purge simply because they don't remember following you.

**What to do:** Stay memorable. Consistent, quality content keeps you top of mind. If someone genuinely forgot why they followed you, that's a signal to make your content more distinctive.

## 10. They Found Out You Bought Followers

Fake followers and purchased engagement are easier to spot than ever. Apps, tools, and savvy users can all detect suspicious follower patterns. For example, sudden spikes, accounts with no posts, engagement rates that don't match follower counts. Getting caught buying followers damages your credibility instantly.

**What to do:** Don't buy followers. Ever. Build slowly and authentically. 1,000 engaged real followers are worth more than 10,000 ghost accounts for your reach, your reputation, and any future brand partnerships.

## The Bigger Picture

Unfollows are a normal part of Instagram. Every account loses followers, even the biggest ones. What matters is your net growth over time and the quality of engagement from the followers you keep.

The best way to reduce unfollows is to understand your audience, stay consistent, and post content that genuinely adds value to someone's day.

Curious who has unfollowed you recently? Use WhosFake Insights to find out. It's free, private, and takes less than a minute.

[See who unfollowed you →](https://whosfakeinsights.com/tool)`,
  },
  {
    slug: "are-unfollower-apps-safe",
    title: "Is It Safe to Use Instagram Unfollower Apps? A Privacy Guide",
    readTime: "5 min read",
    publishDate: "May 14, 2026",
    excerpt:
      "Most Instagram unfollower apps carry real risks. Here's what you need to know before trusting one with your account.",
    content: `You want to know who unfollowed you on Instagram. You search for a tool, find dozens of apps promising instant results, and then hesitate. Should you actually trust these with your Instagram account?

That hesitation is smart. Here's everything you need to know about unfollower apps, what the risks actually are, and how to check your unfollowers without putting your account or data at risk.

## The Short Answer

Most Instagram unfollower apps carry real risks. Apps that ask for your Instagram username and password, or request permission to access your account, can get your account suspended, expose your personal data, or worse. However there is a completely safe alternative that most people don't know about. And it gives you more accurate results anyway.

## How Most Unfollower Apps Work

The majority of unfollower apps on the market work in one of two ways:

**Method 1: They ask for your Instagram login credentials.** You type in your username and password directly into their app. They log into Instagram as you, scrape your follower and following data, and show you the results.

This is the most dangerous approach. You are handing a third party full access to your Instagram account. There is no way to know what they do with your credentials after you enter them.

**Method 2: They use Instagram's API with OAuth login.** You tap "Login with Instagram," get redirected to Instagram's authorization page, and grant the app permission to access your account data.

This is safer than giving your password directly, but Instagram has heavily restricted what third-party apps can access through their API. Most follower and following data is no longer available through official channels, which means apps claiming to show this data are either using workarounds, scraping, or showing you outdated information.

## The Real Risks of Third-Party Unfollower Apps

**Account suspension.** Instagram's terms of service explicitly prohibit using third-party apps that access your account in unauthorized ways. Instagram actively detects suspicious login patterns and automated behavior. Getting caught can result in a temporary action block, a permanent suspension, or having your account disabled entirely.

**Data harvesting.** When you give an app access to your Instagram account, you're often also giving them access to your profile information, your followers list, your direct messages, and sometimes your email address. Many free apps monetize by selling this data to advertisers or data brokers. You are the product.

**Password exposure.** Apps that ask you to type your password into their interface are storing or transmitting that password. If their servers are ever breached, and data breaches happen constantly, your Instagram password and potentially your email password are exposed. If you reuse passwords across accounts, the damage compounds.

**Inaccurate results.** Because Instagram has restricted API access to follower data, many apps can't actually pull your real follower list accurately. They show you approximations, cached data, or results based on incomplete information. You might unfollow someone who actually does follow you, or miss people who genuinely don't.

## How to Tell If an App Is Risky

Ask yourself these questions before using any unfollower tool:

- Does it ask for my Instagram password? → Red flag. Stop.
- Does it require logging in with Instagram? → Potentially risky. Check their privacy policy carefully.
- Is it a free app with no clear business model? → You're likely the product.
- Does it have thousands of reviews but a vague privacy policy? → Proceed with caution.
- Does it process my data on their servers? → Your data is leaving your device.

## The Safe Alternative: Your Own Instagram Data Export

Here's what most people don't know, Instagram lets you download a complete copy of all your data directly from their settings. This includes your full, accurate followers list and everyone you follow, exported in a clean JSON format.

This is the official, terms-of-service compliant way to access your own follower data. Instagram built this feature specifically to give users control over their information.

Once you have your data export, you can upload it to a privacy-first tool like WhosFake Insights, which compares your followers and following lists entirely within your browser. No login required. No password entered. No data sent to a server. Your Instagram data never leaves your device.

This approach is:

- Completely within Instagram's terms of service
- 100% accurate — straight from Instagram's own database
- Private — your data stays on your device
- Free — no subscription, no hidden fees
- Safe — no account access required

## What About Browser Extensions?

Browser extensions that claim to show your unfollowers while you browse Instagram are another category to be careful about. Many of these extensions have broad permissions to read and modify data on any webpage you visit. A poorly built or malicious extension can capture passwords, inject ads, or track your entire browsing history.

If you do use a browser extension, check the permissions it requests carefully, read recent reviews, and verify the developer is reputable. When in doubt, skip it.

## The Bottom Line on App Safety

The safest rule is simple: never give a third-party app your Instagram password, and be cautious about granting OAuth access to apps with unclear privacy policies.

You don't need to. Instagram gives you direct access to your own follower data through their official export feature, and tools like WhosFake Insights are built specifically to use that data in a way that keeps you safe.

Your account and your data are worth protecting. The few minutes it takes to do this the right way are worth it.

[Check your unfollowers safely →](https://whosfakeinsights.com/tool)`,
  },
  {
    slug: "instagram-data-export",
    title: "Instagram Data Export: What's Actually In It",
    readTime: "4 min read",
    publishDate: "April 26, 2026",
    excerpt:
      "Instagram collects a surprising amount of data about you. Here's a complete breakdown of what's in your export file.",
    content: `When Instagram tells you that you can download your data, most people assume it's a small file with basic account information. The reality is quite different. Instagram collects a surprising amount of data about you, and their export feature gives you access to almost all of it.

Here's a complete breakdown of what's actually inside your Instagram data export and what to do with its contents.

## How to Request Your Instagram Data Export

Before diving into what's inside, here's how to get it:

### On desktop:

1. Go to instagram.com and log in
2. Click your profile picture → menu (☰) → Settings and privacy
3. Scroll to See more in Accounts Center
4. Tap Your information and permissions
5. Click Export your information → Create export
6. Choose Export to device, set format to JSON, range to All time
7. Click Start export

### On mobile:

1. Open Instagram → tap your profile → menu (☰) → Settings
2. Tap Accounts Center → Your information and permissions
3. Tap Export your information → Create export → Export to device
4. Set format to JSON, range to All time → Start export

Instagram will email you a download link within minutes to a few hours. The file arrives as a ZIP archive.

## What's Inside the ZIP File

When you unzip the file you'll find several folders, each containing JSON files organized by category. Here's what each section contains:

## Followers and Following

This is the most commonly used section and what WhosFake Insights uses to find your unfollowers.

- **followers_1.json** — a complete list of every account that follows you, including their username, profile URL, and the exact timestamp of when they followed you
- **following.json** — every account you follow, with the same information

This data is perfectly accurate because it comes directly from Instagram's own database. The data is not scraped, not estimated, not cached. It reflects your real follower and following lists at the moment you requested the export.

**Pro tip:** If you only want this section, you can select "Followers and Following" specifically during the export setup for a much smaller, faster download.

## Messages

Your complete Instagram Direct Message history: every conversation, every message, every media file shared. This includes:

- All text messages sent and received
- Photos and videos shared in DMs
- Voice messages
- Reactions to messages
- Group chat history

This section can be very large if you're an active DM user.

## Content You've Created

Everything you've ever posted on Instagram:

- Every photo and video you've posted to your feed, with original files and captions
- Every Story you've posted (Instagram only keeps Stories for 24 hours on the platform, but they're preserved in your export)
- Every Reel you've created
- Every note you've posted

This is actually one of the most useful sections. If you've ever accidentally deleted a post or lost a Story you wanted to keep, your data export has a backup.

## Comments

- Every comment you've ever left on any post
- Every comment left on your posts
- Comments you've liked

## Likes

- Every post you've ever liked
- Every comment you've liked
- Every Story you've liked

Seeing years of likes in one file is surprisingly revealing. It's essentially a history of what content has caught your attention on Instagram.

## Saved Posts

Your complete saved posts collection, organized by collection if you've created any. If you've ever lost a saved post or had your collections reorganized unexpectedly, your export has everything.

## Profile Information

- Your username history (every username you've ever used on the account)
- Your bio history
- Your profile picture history
- Your email addresses and phone numbers linked to the account
- Your account creation date and original signup information

## Search History

Every search you've ever typed into Instagram's search bar, with timestamps. This is one of the more surprising sections for most people, Instagram has kept a record of every term you've searched, going back years.

## Ad Interests and Advertising Data

This section reveals how Instagram has categorized you for advertising purposes:

- Your inferred interests based on your behavior (topics Instagram thinks you care about)
- Advertisers who have targeted you specifically
- Advertisers who have your contact information on their customer lists
- Your ad click history

This is one of the most eye-opening sections in the entire export. Most people are surprised by how detailed and accurate Instagram's interest profile is. They are equally surprised by how many advertisers have uploaded their contact information and matched it to their Instagram account.

## Device Information

- Every device you've ever logged into Instagram from
- IP addresses associated with your logins
- Login timestamps and locations

This section is useful if you've ever suspected unauthorized access to your account. A login from an unrecognized device or location would appear here.

## How Big Is the Export?

It depends entirely on how long you've been on Instagram and how active you are. A typical export ranges from a few megabytes to several gigabytes for very active, long-term users. The largest contributor is usually media: photos, videos, and voice messages in your DMs.

If you only need follower and following data, selecting just that section during export keeps the file small and the download fast, usually just a few hundred kilobytes.

## What Instagram Doesn't Include

A few things are notably absent from the export:

- Content you've viewed but not interacted with (Instagram keeps this but doesn't include it in user exports)
- Full algorithmic data about how your content is ranked
- Data shared with third-party advertisers beyond what's in the ad interests section

## Using Your Export Wisely

Your Instagram data export is one of the most complete pictures of your activity on the platform. Beyond checking unfollowers with WhosFake Insights, you can use it to:

- Back up your posts and Stories before deleting your account
- Audit which advertisers have your data
- Review your search history and clear it if desired
- Recover deleted content
- Check for unauthorized logins

Instagram is required by law in many regions (including the EU under GDPR) to provide this export on request. It's your data so you have the right to see it, use it, and understand what's been collected.

[Use your export to find your unfollowers →](https://whosfakeinsights.com/tool)`,
  },
  {
    slug: "how-to-grow-real-followers",
    title: "How to Grow Real Instagram Followers (Not Fake Ones)",
    readTime: "5 min read",
    publishDate: "May 31, 2026",
    excerpt:
      "There's a massive difference between a large follower count and a real audience. Here's how to build one that actually sticks.",
    content: `Everyone wants more Instagram followers. But there's a massive difference between a large follower count and a real audience. In 2026, that difference matters more than ever.

Here's a practical, honest guide to growing your Instagram following with real people who actually care about your content.

## Why Fake Followers Are Worse Than No Followers

Before getting into growth strategies, it's worth understanding why buying followers or using follow/unfollow bots is a losing strategy.

Instagram's algorithm serves your content based on engagement rate, the percentage of your followers who like, comment, save, and share your posts. If you have 10,000 followers but only 50 of them engage, your engagement rate is 0.5%. Instagram reads this as a signal that your content isn't worth showing to more people, and your reach collapses.

Real followers engage. Fake followers don't. A smaller, engaged audience will always outperform a large, hollow one: in reach, in brand partnerships, and in actual influence.

## 1. Define Your Niche Clearly

The accounts that grow fastest on Instagram have one thing in common: you know exactly what they're about within seconds of landing on their profile.

Pick a specific niche and own it. Not just "fitness" but "home workouts for busy parents." Not just "food" but "30-minute budget meals for college students." The more specific you are, the easier it is for the right people to find you and immediately understand why they should follow you.

Your bio should communicate your niche in one or two sentences. If someone lands on your profile and can't tell what you post about, they won't follow you.

## 2. Post Consistently

Consistency is the single most important factor in Instagram growth. The algorithm rewards accounts that post regularly by showing their content to more people. Your followers expect a certain cadence from you. If you disappear for weeks, they forget you exist.

You don't need to post every day. Pick a schedule you can actually maintain, three times a week, five times a week, whatever works for your life, and stick to it. A consistent account that posts three times a week will outgrow an inconsistent account that posts daily for two weeks then goes dark.

## 3. Master Reels

Instagram has been pushing Reels hard since 2020 and that hasn't changed. Reels get significantly more reach than static posts or carousels, especially for accounts trying to grow to new audiences.

You don't need professional video equipment. The most successful Reels are often shot on a phone with natural lighting. What matters is the hook, the first one to two seconds need to stop someone from scrolling. A strong visual, an unexpected statement, or a compelling question in the first frame makes all the difference.

Study Reels in your niche that are performing well. Notice what hooks they use, how long they are, and what makes people want to watch to the end.

## 4. Use Hashtags Strategically

Hashtags are still relevant in 2026, but the strategy has shifted. Using 30 random hashtags on every post no longer works the way it used to.

Instead focus on a mix of hashtag sizes. Use a few large hashtags in your niche (1M+ posts), several medium ones (100K-1M posts), and some smaller niche-specific ones (under 100K posts). The smaller hashtags are where new accounts can actually get discovered, the large ones are too competitive.

More importantly, make sure every hashtag is genuinely relevant to the specific post. Instagram's algorithm has gotten much better at detecting hashtag spam and penalizing it.

## 5. Engage Before and After Posting

One of the most effective growth tactics that most people ignore is manual engagement. Spend 15-20 minutes engaging with content in your niche before you post and another 15-20 minutes after. Like posts, leave genuine comments, and respond to Stories.

This signals to Instagram that you're an active, engaged member of the community. It also puts your profile in front of people in your niche who might not have found you otherwise. When you leave a thoughtful comment on a popular post, people click your profile out of curiosity.

## 6. Collaborate With Other Accounts

Collaborations are one of the fastest ways to reach new audiences. Find accounts in your niche at a similar size to yours and propose a collaboration. This can look like a joint Reel, a shoutout exchange, a shared giveaway, or an Instagram Live together.

When you collaborate, both audiences are exposed to both accounts. Done right, a single collaboration can drive hundreds of new real followers in a day. The key is finding accounts whose audience overlaps with yours but doesn't compete directly with you.

## 7. Optimize Your Posting Time

Posting when your audience is most active increases your initial engagement, which tells the algorithm your content is worth showing to more people. Check your Instagram Insights (available on creator and business accounts) to see when your followers are most active and schedule your posts accordingly.

For most accounts this is either early morning (7-9am), lunch (12-1pm), or evening (7-10pm) in your audience's primary timezone.

## 8. Create Saveable Content

Saves are one of the most powerful engagement signals on Instagram. When someone saves your post, they're telling the algorithm this content is valuable enough to come back to. Posts with high save rates get pushed to the Explore page and shown to new audiences.

Content that gets saved tends to be educational, inspirational, or practical: tips, tutorials, guides, and before/after transformations all perform well. Ask yourself before posting: would someone save this? If not, how could you make it more valuable?

## 9. Clean Up Your Following List

This one surprises people but it matters. If you're following 3,000 accounts and only have 500 followers, your profile looks like a follow/unfollow spammer to anyone who visits. A healthier following-to-followers ratio builds more trust with new visitors.

Periodically reviewing who you follow and unfollowing inactive accounts, accounts that no longer post relevant content, or accounts that don't follow you back keeps your profile looking credible.

This is where WhosFake Insights comes in. Run a check every month or two to see who isn't following you back and clean up your list intentionally.

[Check who doesn't follow you back →](https://whosfakeinsights.com/tool)

## 10. Be Patient and Play the Long Game

Real Instagram growth is slow. Most successful accounts took years to build their following. The people who give up after three months of consistent posting and "only" gaining 500 followers miss the compounding effect, however, those 500 real followers engage, share, and bring in more followers over time.

Set realistic expectations. Focus on improving your content quality every month rather than obsessing over follower counts. The numbers follow the quality.

## The Bottom Line

Growing a real Instagram following comes down to consistency, quality, and genuine engagement. There are no shortcuts that don't come with serious downsides. Fake followers hurt your reach, bots get your account suspended, and buying engagement destroys your credibility.

Build slowly, build authentically, and build an audience that actually wants to hear from you. That's the following worth having.`,
  },
  {
    slug: "how-to-see-who-unfollowed-you",
    title: "How to See Who Unfollowed You on Instagram in 2026",
    readTime: "5 min read",
    publishDate: "June 2, 2026",
    excerpt:
      "Instagram doesn't notify you when someone unfollows you. Here's how to find out safely using your own data.",
    content: `If you've ever noticed your follower count quietly drop overnight, you're not alone. Instagram doesn't notify you when someone unfollows you, that is intentional. But that doesn't mean you can't find out.

This guide covers everything you need to know about checking who unfollowed you on Instagram in 2026, without using sketchy third-party apps that ask for your password.

## Why Instagram Doesn't Tell You

Instagram's design philosophy has always prioritized reducing social anxiety on the platform. Notifying you every time someone unfollows you would create a toxic feedback loop, for example, obsessive checking, confrontations, and a worse experience for everyone.

But that doesn't mean you don't have the right to know. Your follower and following data belongs to you, and Instagram actually gives you full access to it through their official data export tool.

## The Safe Way vs. The Risky Way

Before we get into the how, it's worth understanding the landscape of unfollower tools.

**Risky: Third-party apps that ask for your login.** There are dozens of apps on the App Store and Google Play that promise to show you your unfollowers. Most of them ask you to log in with your Instagram credentials. This is dangerous for several reasons: you're handing your username and password to an unknown third party, Instagram's terms of service prohibit sharing your credentials with third-party apps, and your account could be suspended or hacked.

**Safe: Using your official Instagram data export.** Instagram lets you download a complete copy of your data directly from their settings. This includes your full followers list and everyone you follow. By comparing these two lists, you can see exactly who isn't following you back and this is all done without logging into anything, without sharing your password, and without violating any terms of service.

This is exactly how WhosFake Insights works. You download your data from Instagram, upload it to our tool, and we compare the lists right in your browser. Your data never leaves your device.

## Step by Step: How to Check Who Unfollowed You

### On Desktop (Browser):

1. Go to instagram.com and log into your account
2. Click your profile picture in the top right
3. Click the menu icon (☰) and select Settings and privacy
4. Scroll down and click See more in Accounts Center
5. Select Your information and permissions
6. Click Export your information
7. Click Create export
8. Choose Export to device
9. Set the date range to All time and the format to JSON
10. Click Start export. Instagram will email you a download link within minutes to a few hours

### On Mobile (Instagram App):

1. Open the Instagram app and tap your profile icon
2. Tap the menu (☰) in the top right
3. Tap Settings
4. Tap Accounts Center
5. Tap Your information and permissions
6. Tap Export your information
7. Tap Create export → Export to device
8. Set range to All time, format to JSON
9. Tap Start export

**Pro tip:** On the information selection screen, you can choose to export only "Followers and Following" data for a much faster, smaller download.

## Analyzing Your Data with WhosFake Insights

Once you receive your download link from Instagram:

1. Download the ZIP file to your device
2. Go to whosfakeinsights.com
3. Upload the ZIP file (or just the followers/following JSON files)
4. WhosFake Insights instantly compares your followers and following lists
5. You'll see a complete table of everyone who doesn't follow you back, including when you started following them

The results table shows each person's username as a clickable link to their Instagram profile, and the date you started following them.

## What to Do With the Results

Once you have your list there are a few approaches:

**Unfollow everyone at once?** Instagram's algorithm watches for sudden mass-unfollowing behavior. If you unfollow hundreds of people in a short window, you may trigger a temporary action block. A safer approach is unfollowing 20-30 people per day.

**Should you unfollow everyone who doesn't follow back?** Not necessarily. Some accounts are businesses, celebrities, news sources, or creators you genuinely want to follow for their content. Focus on unfollowing accounts that are inactive or that you followed expecting a follow-back.

**Check back regularly.** People unfollow over time as interests change. Running this check every 1-3 months gives you a clear picture of your actual audience vs. who you're supporting with your follows.

## Frequently Asked Questions

**Does WhosFake Insights store my Instagram data?** No. All processing happens in your browser. The moment you close the tab, your data is gone. Nothing is ever sent to a server.

**Will Instagram know I used this tool?** No. You're simply downloading your own data (something Instagram explicitly allows) and opening it in a web tool. No API calls are made to Instagram.

**Is this against Instagram's terms of service?** No. Instagram's data export feature exists specifically for users to access their own data. Using your own data in a third-party tool that doesn't connect to Instagram's servers is completely within the rules.

**How often should I check?** Once a month is a good cadence for most users. If you're actively growing your account, once a week gives you a clearer picture of who's engaging vs. dropping off.

## The Bottom Line

Checking who unfollowed you on Instagram doesn't have to involve sketchy apps or risking your account. By using Instagram's official data export and a privacy-first tool like WhosFake Insights, you get complete, accurate results that are safe and free to obtain.

[Check who unfollowed you now →](https://whosfakeinsights.com/tool)`,
  },
];

/** Look up a single post by slug. Returns undefined if not found. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
