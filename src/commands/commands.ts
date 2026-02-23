import { fetchFeed } from "src/lib/rss";
import { addFeed } from "src/lib/db/queries/feeds";
import type { User } from "../lib/db/schema";


export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export type CommandsRegistry = {
  [cmdName: string]: CommandHandler;
};

export async function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const handler = registry[cmdName];
  if (!handler) {
    throw new Error("Unknown command: " + cmdName);
  }
  await handler(cmdName, ...args);
}

export async function handlerAgg(cmdName: string, ...args: string[]) {
  try {
    const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(feed, null, 2));
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error fetching feed: " + err.message);
    } else {
      console.error("An unknown error occurred while fetching the feed");
    }
  }
}

export async function handlerAddFeed(cmdName: string, user: User, ...args: string[]) {
  try {
    await addFeed(cmdName, ...args);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error adding feed: " + err.message);
    } else {
      console.error("An unknown error occurred while adding the feed");
    }
    process.exit(1); 
  }
}

