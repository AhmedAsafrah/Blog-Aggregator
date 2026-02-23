import { getFeeds } from "src/lib/db/queries/feeds";
import { getUserById } from "src/lib/db/queries/users";

export async function handlerListFeeds(cmdName: string, ...args: string[]) {
    const feeds = await getFeeds();
    if (feeds.length === 0) {
        console.log("No feeds found");
        return;
    }
    for (const feed of feeds) {
        const user = await getUserById(feed.userId);
        console.log(`ID: ${feed.id}`);
        console.log(`Name: ${feed.name}`);
        console.log(`URL: ${feed.url}`);
        console.log(`User: ${user ? user.name : "Unknown"}`);
        console.log("-----");
    }
}