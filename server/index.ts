import "reflect-metadata";
import next from "next";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(bodyParser());

  router.all("(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  server.listen(PORT, () => {
    console.log(
      `> Server listening at http://localhost:${PORT} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
    process.send && process.send("ready");
  });
});
