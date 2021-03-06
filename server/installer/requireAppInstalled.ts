import { redisStore } from "../config/redis";
import { KoaContext } from "../types/koa-types";
import { Next } from "koa";
import { NextServer } from "../types/next-types";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createConnection, getConnection } from "typeorm";
import { DatabaseConfigFile, DB_CONFIG } from "../config/db";
import { logger } from "../utils/logger";

const installPath = "/install";

const databaseConfigFile = join(__dirname, "../config/database-config.json");

export const requireAppInstalled = (app: NextServer) => async (
  ctx: KoaContext,
  next: Next
) => {
  try {
    const result = await redisStore.get("installedApplication");
    if (result) return next();
    else {
      const configFileExists = existsSync(databaseConfigFile);
      if (configFileExists) {
        const isConnected = await connectionExist();

        if (isConnected) return await next();
        const file = readFileSync(databaseConfigFile, { encoding: "utf-8" });
        const databaseConfig: DatabaseConfigFile = JSON.parse(file);
        logger.info("🔌 Creating connection");
        await createConnection({
          ...DB_CONFIG,
          ...databaseConfig,
        });
        logger.info("🔌 Connection created");

        return await next();
      } else {
        if (ctx.path === installPath) {
          renderInstall(app, ctx);
        } else {
          ctx.redirect(installPath);
          renderInstall(app, ctx);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const renderInstall = (app: NextServer, ctx: KoaContext) => {
  app.render(ctx.req, ctx.res, installPath, ctx.query);
  ctx.respond = false;
};

const connectionExist = (): Promise<boolean> =>
  new Promise((res) => {
    try {
      const isConnected = getConnection().isConnected;
      res(isConnected);
    } catch (error) {
      res(false);
    }
  });
