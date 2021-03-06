import { join } from "path";
// import { User } from "../../server/entity/User";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require("dotenv").config();

export const DB_CONFIG: PostgresConnectionOptions = {
  type: "postgres",
  logging: false,
  synchronize: true,
  entities: [join(__dirname, "..", "gql/entity/**/*{.ts,.js}")],
  migrations: [join(__dirname, "..", "gql/migration/**/*{.ts,.js}")],
  subscribers: [join(__dirname, "..", "gql/subscriber/**/*{.ts,.js}")],
};

export type DatabaseConfigFile = Pick<
  PostgresConnectionOptions,
  "port" | "host" | "username" | "password" | "database"
>;
