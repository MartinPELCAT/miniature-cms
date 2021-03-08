import session, { opts } from "koa-session";
import Koa from "koa";
import redisStore from "koa-redis";
import { REDIS_CONFIG } from "./redis";

const CONFIG: Partial<opts> = {
  store: redisStore(REDIS_CONFIG),
  key: "koa.sess",
  maxAge: 86400000,
  overwrite: true,
  signed: false,
  rolling: false, // True not working with nextJS
  renew: false,
  secure: false,
};

export const sessionMiddleware = (
  app: Koa<Koa.DefaultState, Koa.DefaultContext>
) => {
  app.keys = ["secret"];
  return session(CONFIG, app);
};
