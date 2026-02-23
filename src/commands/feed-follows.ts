import {
  getFeedFollowsForUser,
  createFeedFollow,
  deleteFeedFollowsByUserIdAndFeedId,
} from "../lib/db/queries/feed-follows";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import type { User } from "../lib/db/schema";

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) throw new Error(`usage: ${cmdName} <feed_url>`);

  const feedUrl = args[0];
  const feed = await getFeedByUrl(feedUrl);
  if (!feed) {
    throw new Error("Feed with the specified URL does not exist");
  }
  const feedFollow = await createFeedFollow(user.id, feed.id);
  console.log(`Feed follow created:`);
    printFeedFollow(feedFollow.userName, feedFollow.feedName);
}

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feedFollows = await getFeedFollowsForUser(user.id);
if (feedFollows.length === 0) {
  console.log(`No feed follows found for this user.`);
  return;
}
console.log(`Feed follows for user %s:`, user.id);

 for (const ff of feedFollows) {
  console.log(`* %s`, ff.feedName); 
}
}

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) throw new Error(`usage: ${cmdName} <feed_url>`);
  const feedUrl = args[0];
  const feed = await getFeedByUrl(feedUrl);
  if (!feed) {
    throw new Error("Feed with the specified URL does not exist");
  }
  const deleted = await deleteFeedFollowsByUserIdAndFeedId(user.id, feed.id);
  if (!deleted) {
    throw new Error("You are not following this feed");
  }
  console.log(`%s unfollowed successfully!`, feed.name);
}