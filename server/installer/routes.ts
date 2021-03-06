import Router from "@koa/router";
import { setupDatabase } from "./setup-database";

const installerRouter = new Router({ prefix: "/api/installer" }).post(
  "/setupDatabase",
  setupDatabase
);

export { installerRouter };
