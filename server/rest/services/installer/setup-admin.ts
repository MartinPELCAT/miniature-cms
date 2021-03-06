import { Middleware } from "@koa/router";

export const setupAdmin: Middleware<any, {}> = (ctx) => {
  console.log(ctx);
};
