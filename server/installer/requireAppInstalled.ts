import { redisStore } from "../config/redis";
import { KoaContext } from "../types/koa-types";
import { Next } from "koa";
import { NextServer } from "../types/next-types";
import { readFileSync, existsSync } from "fs";
import { createConnection, getConnection } from "typeorm";
import { DatabaseConfigFile, DB_CONFIG } from "../config/db";
import { logger } from "../utils/logger";
import { INSTALLED_APP_KEY, DATABASE_CONFIG_FILE, INSTALL_PATH } from "./keys";

export const requireAppInstalled = (app: NextServer) => async (
  ctx: KoaContext,
  next: Next
) => {
  try {
    const result = await redisStore.get(INSTALLED_APP_KEY);
    if (result && result === "true") return next();
    else {
      const configFileExists = existsSync(DATABASE_CONFIG_FILE);
      if (configFileExists) {
        const isConnected = await connectionExist();
        if (isConnected) return await next();

        const file = readFileSync(DATABASE_CONFIG_FILE, { encoding: "utf-8" });
        const databaseConfig: DatabaseConfigFile = JSON.parse(file);
        logger.info("🔌 Creating connection");
        await createConnection({
          ...DB_CONFIG,
          ...databaseConfig,
        });
        logger.info("🔌 Connection created");
        redisStore.set(INSTALLED_APP_KEY, "true");
        return await next();
      } else {
        ctx.res.statusCode = 200;
        if (ctx.path === INSTALL_PATH) {
          await renderInstall(app, ctx);
        } else {
          ctx.redirect(INSTALL_PATH);
          await renderInstall(app, ctx);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const renderInstall = async (app: NextServer, ctx: KoaContext) => {
  await app.render(ctx.req, ctx.res, INSTALL_PATH, ctx.query);
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
