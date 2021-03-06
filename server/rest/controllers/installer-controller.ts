import Router from "@koa/router";
import { checkDatabase, setupDatabase } from "../services/installer";
import { setupAdmin } from "../services/installer/setup-admin";

export const installerController = new Router({
  prefix: "/api/installer",
})
  .post("/setup-database", setupDatabase)
  .get("/check-database", checkDatabase)
  .post("/setup-admin", setupAdmin)
  .post("/check-admin", setupAdmin);
