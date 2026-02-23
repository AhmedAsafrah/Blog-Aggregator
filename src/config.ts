import fs from "fs";
import os from "os";
import path from "path";

function getConfigFilePath(): string {
  return path.join(os.homedir(), ".gatorconfig.json");
}

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function readConfig(): Config {
  const data = fs.readFileSync(getConfigFilePath(), "utf-8");
  const raw = JSON.parse(data);
  return {
    dbUrl: raw.db_url,
    currentUserName: raw.current_user_name,
  };
}

function writeConfig(config: Config) {
  const data = JSON.stringify(
    {
      db_url: config.dbUrl,
      current_user_name: config.currentUserName,
    },
    null,
    2,
  );
  fs.writeFileSync(getConfigFilePath(), data, "utf-8");
}

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}
