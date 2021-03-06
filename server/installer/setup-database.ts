import { KoaContext } from "../types/koa-types";
import { writeFileSync } from "fs";
import { DATABASE_CONFIG_FILE } from "./keys";
import { connectDatabase } from "../utils/database-utils";

export const setupDatabase = async (ctx: KoaContext) => {
  const datas = ctx.request.body;
  datas.port = parseInt(datas.port);
  writeFileSync(DATABASE_CONFIG_FILE, JSON.stringify(datas, null, 2));
  await connectDatabase(datas);
  ctx.body = { success: true };
};
