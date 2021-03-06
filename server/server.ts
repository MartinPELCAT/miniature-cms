import "reflect-metadata";
import next from "next";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { useContainer } from "typeorm";
import { logger } from "./utils/logger";
import Container from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { resolvers } from "./resolvers";
import { sessionMiddleware } from "./config/session";
import { installerRouter } from "./installer/routes";
import { requireAppInstalled } from "./installer/requireAppInstalled";
import { redisStore } from "./config/redis";
import { INSTALLED_APP_KEY } from "./installer/keys";

useContainer(Container);

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

export const server = async () => {
  return app.prepare().then(async () => {
    try {
      logger.info("Starting Application");

      await redisStore.del(INSTALLED_APP_KEY);

      const server = new Koa();
      const router = new Router();

      server.use(bodyParser());
      server.use(sessionMiddleware(server));

      const schema = await buildSchema({
        resolvers,
        container: Container,
      });

      const apollo = new ApolloServer({
        schema,
        playground: {
          settings: {
            "request.credentials": "same-origin",
          },
        },
        context: async ({ res, req }) => ({ res, req }),
      });

      apollo.applyMiddleware({ app: server, path: "/api/gql" });

      server
        .use(installerRouter.routes())
        .use(installerRouter.allowedMethods());

      router.use(requireAppInstalled(app));

      router.all("(.*)", async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
      });

      // server.use(async (ctx, next) => {
      //   ctx.res.statusCode = 200;
      //   await next();
      // });

      server.use(router.routes()).use(router.allowedMethods());

      server.listen(PORT, () => {
        logger.info(`🚀 http://localhost:${PORT} `);
        logger.info(`🚀 http://localhost:${PORT}${apollo.graphqlPath}`);
        process.send && process.send("ready");
      });
    } catch (error) {
      console.error(error);
      process.exit(0);
    }
  });
};
