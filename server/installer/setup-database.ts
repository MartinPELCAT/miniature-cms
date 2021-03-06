import { KoaContext } from "../types/koa-types";
import { writeFileSync } from "fs";
import { DATABASE_CONFIG_FILE } from "./keys";

export const setupDatabase = async (ctx: KoaContext) => {
  const datas = ctx.request.body.port;
  datas.port = parseInt(datas.port);
  writeFileSync(DATABASE_CONFIG_FILE, JSON.stringify(datas, null, 2));
  ctx.body = { success: true };
};
