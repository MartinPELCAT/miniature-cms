import Router from "@koa/router";

const installerRouter = new Router({ prefix: "/api/installer" });

installerRouter.post("/setupDatabase", (ctx) => {
  console.log(ctx.request.body);
  ctx.body = { success: true };
});

export { installerRouter };
