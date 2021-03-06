import { writeFileSync } from "fs";
import { KoaContext } from "../../../types/koa-types";
import { connectDatabase } from "../../../utils/database-utils";
import { DATABASE_CONFIG_FILE } from ".";
import { existsSync } from "fs";

export const setupDatabase = async (ctx: KoaContext) => {
  const datas = ctx.request.body;
  datas.port = parseInt(datas.port);
  writeFileSync(DATABASE_CONFIG_FILE, JSON.stringify(datas, null, 2));
  await connectDatabase(datas);
  ctx.body = { success: true };
};

export const checkDatabase = async (ctx: KoaContext) => {
  const configFileExists = existsSync(DATABASE_CONFIG_FILE);
  if (configFileExists) {
    return (ctx.body = { installed: true });
  }
  return (ctx.body = { installed: false });
};
