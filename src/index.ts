import { handlerLogin, handlerRegister, users } from "./commands/users";
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
  handlerAgg,
  handlerAddFeed,
} from "./commands/commands.js";
import { handlerListFeeds } from "./commands/feeds";
import { handlerReset } from "./commands/reset";
import {
  handlerFollow,
  handlerFollowing,
  handlerUnfollow,
} from "./commands/feed-follows";
import { middlewareLoggedIn } from "./middleware";
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Command is required");
    process.exit(1);
  }
  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const registry: CommandsRegistry = {};
  await registerCommand(registry, "login", handlerLogin);
  await registerCommand(registry, "register", handlerRegister);
  await registerCommand(registry, "reset", handlerReset);
  await registerCommand(registry, "users", users);
  await registerCommand(registry, "agg", handlerAgg);
  await registerCommand(
    registry,
    "addfeed",
    middlewareLoggedIn(handlerAddFeed),
  );
  await registerCommand(registry, "feeds", handlerListFeeds);
  await registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  await registerCommand(
    registry,
    "following",
    middlewareLoggedIn(handlerFollowing),
  );
  await registerCommand(
    registry,
    "unfollow",
    middlewareLoggedIn(handlerUnfollow),
  );
  try {
    await runCommand(registry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error: " + err.message);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
  process.exit(0);
}

main();
