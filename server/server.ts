import "reflect-metadata";
import next from "next";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { useContainer } from "typeorm";
import { logger } from "./utils/logger";
import Container from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { resolvers } from "./gql/resolvers";
import { sessionMiddleware } from "./config/session";
import { installerController } from "./rest/controllers/installer-controller";
import { redisStore } from "./config/redis";
import { nextRouter } from "./rest/controllers/next-controller";
import {
  INSTALLED_APP_KEY,
  requireAppInstalled,
} from "./rest/services/installer";

useContainer(Container);

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nextRoutes = nextRouter(handle, app);

export const server = async () => {
  return app.prepare().then(async () => {
    try {
      logger.info("Starting Application");

      await redisStore.del(INSTALLED_APP_KEY);

      const server = new Koa();

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

      // Add all routes
      server
        .use(installerController.routes())
        .use(installerController.allowedMethods());

      server.use(requireAppInstalled(app));
      apollo.applyMiddleware({ app: server, path: "/api/gql" });
      server.use(nextRoutes.routes()).use(nextRoutes.allowedMethods());

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
