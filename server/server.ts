import "reflect-metadata";
import next from "next";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import { createConnection, useContainer } from "typeorm";
import { logger } from "./utils/logger";
import Container from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { DB_CONFIG } from "./config/db";
import { resolvers } from "./resolvers";

useContainer(Container);

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

export const server = async () => {
  return app.prepare().then(async () => {
    try {
      logger.info("Starting Application");
      const server = new Koa();
      const router = new Router();

      server.use(bodyParser());

      logger.info("Connecting database ... ");
      await createConnection(DB_CONFIG);
      logger.info("Database connected");

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
