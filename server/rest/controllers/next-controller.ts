import Router from "@koa/router";
import { KoaHandler } from "../../types/koa-types";
import { NextServer } from "../../types/next-types";

export const nextRouter = (handle: KoaHandler, _app: NextServer) => {
  const router = new Router();

  // router.get("/install", async (ctx) => {
  //   console.log("render install");

  //   await app.render(ctx.req, ctx.res, "/install", ctx.query);
  //   ctx.respond = false;
  // });

  router.all("(.*)", async (ctx) => {
    // (ctx.req as KoaCustomReq).session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  router.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  return router;
};
