import { join } from "path";

export const INSTALL_PATH = "/install";

export const INSTALLED_APP_KEY = "installedApplication";

export const DATABASE_CONFIG_FILE = join(
  __dirname,
  "../../../config/database-config.json"
);

export * from "./require-install-middleware";
export * from "./setup-database";
