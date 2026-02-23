import { createUser, getUser, getUsers } from "../lib/db/queries/users";

import { readConfig, setUser } from "../config";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("Username is required");
  }
  const name = args[0];

  const user = await getUser(name);
  if (!user) {
    throw new Error("User does not exist");
  }

  setUser(user.name);
  console.log("Logged in as " + user.name);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length < 1) {
    throw new Error("Username is required");
  }
  const name = args[0];

  const user = await createUser(name);

  setUser(user.name);
  console.log("User was created: " + user.name);
}

export async function users(cmdName: string, ...args: string[]) {
  const configUser = readConfig();
  const allUsers = await getUsers();
  for (const user of allUsers) {
    if (user.name === configUser.currentUserName) {
      console.log("* " + user.name + " (current)");
    } else {
      console.log("* " + user.name);
    }
  }
}
