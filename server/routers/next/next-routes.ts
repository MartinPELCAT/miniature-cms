import Router from "@koa/router";
import { KoaHandler } from "../../types/koa-types";
import { NextServer } from "../../types/next-types";

export const nextRouter = (handle: KoaHandler, app: NextServer) => {
  const router = new Router();

  router.get("/install", (ctx) => {
    app.render(ctx.req, ctx.res, "/install", ctx.query);
    ctx.respond = false;
  });

  router.all("(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  return router;
};
