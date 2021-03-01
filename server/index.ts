import next from "next";
import Koa from "koa";
import Router from "@koa/router";

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.all("(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
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
