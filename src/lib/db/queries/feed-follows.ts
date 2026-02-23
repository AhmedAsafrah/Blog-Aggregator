
import { db } from "src/lib/db";
import { eq, and } from "drizzle-orm";

import { feedFollows, feeds, users } from "src/lib/db/schema";

export async function createFeedFollow(userId: string, feedId : string) {
    const [inserted] = await db.insert(feedFollows).values({ userId, feedId }).returning({id: feedFollows.id});
 
    const [row] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, inserted.id));
    return row;
}

export async function getFeedFollowsForUser(userId: string) {
    return await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        userId: feedFollows.userId,
        feedId: feedFollows.feedId,
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name,
    }).from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, userId));
}

export async function deleteFeedFollowsByUserIdAndFeedId(userId: string, feedId: string) {
  const [deleted] = await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId, userId), eq(feedFollows.feedId, feedId)))
    .returning();

  return deleted;
}