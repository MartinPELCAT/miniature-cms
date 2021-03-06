import { Next } from "koa";
import { existsSync, readFileSync } from "fs";
import { DatabaseConfigFile } from "../../../config/db";
import { redisStore } from "../../../config/redis";
import { KoaContext } from "../../../types/koa-types";
import { NextServer } from "../../../types/next-types";
import {
  connectionExist,
  connectDatabase,
} from "../../../utils/database-utils";
import { INSTALLED_APP_KEY, DATABASE_CONFIG_FILE, INSTALL_PATH } from ".";

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
        await connectDatabase(databaseConfig);
        redisStore.set(INSTALLED_APP_KEY, "true");
        return await next();
      } else {
        await renderInstall(app, ctx);
        // if (ctx.path === INSTALL_PATH) {
        //   await renderInstall(app, ctx);
        // } else {
        //   ctx.redirect(INSTALL_PATH);
        //   await renderInstall(app, ctx);
        // }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const renderInstall = async (app: NextServer, ctx: KoaContext) => {
  ctx.res.statusCode = 200;
  await app.render(ctx.req, ctx.res, INSTALL_PATH, ctx.query);
  ctx.respond = false;
};

export const isDatabaseInstalled = async (): Promise<boolean> => {
  return true;
};

export const isAdminInstalled = () => {};
