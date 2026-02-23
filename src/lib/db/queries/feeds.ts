import { readConfig } from "../../../config";
import { db } from "..";
import { Feed, feeds, User } from "../schema";
import { getUser } from "./users";
import { eq } from "drizzle-orm";
import { createFeedFollow } from "./feed-follows";
import { middlewareLoggedIn } from "src/middleware";

export async function addFeed(cmdName: string, ...args: string[]) {
  const user = readConfig().currentUserName;
  const currentUser = await getUser(user);

  if (!currentUser) {
    throw new Error("Current user does not exist in the database");
  }

  if (args.length < 2) {
    throw new Error("Feed URL is required");
  }
  const name = args[0];
  const url = args[1];

  const [feed] = await db
    .insert(feeds)
    .values({
      name: name,
      url: url,
      userId: currentUser.id,
    })
    .returning();
  const feedFollow = await createFeedFollow(currentUser.id, feed.id);
  console.log(feedFollow.feedName);
  console.log(feedFollow.userName);
}

export function printFeed(feed: Feed, user: User) {
  console.log(`ID: ${feed.id}`);
  console.log(`Name: ${feed.name}`);
  console.log(`URL: ${feed.url}`);
  console.log(`User: ${user.name}`);
  console.log("-----");
}

export async function getFeeds() {
  const allFeeds = await db.select().from(feeds);
  return allFeeds;
}

export async function getFeedByUrl(url: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, url));
  return feed;
}
