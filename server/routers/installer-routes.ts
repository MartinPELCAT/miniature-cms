import Router from "@koa/router";
import { setupDatabase } from "../installer/setup-database";

const installerRouter = new Router({ prefix: "/api/installer" })
  .post("/setupDatabase", setupDatabase)
  .post("/test", (ctx) => {
    ctx.body = { sucessTest: true };
  });

export { installerRouter };
