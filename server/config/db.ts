import { join } from "path";
// import { User } from "../../server/entity/User";
import { ConnectionOptions } from "typeorm";

require("dotenv").config();

export const DB_CONFIG: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  port: parseInt(process.env.DB_PORT || "5432"),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  // entities: [User],
  entities: [join(__dirname, "..", "entity/**/*.ts")],
  migrations: [join(__dirname, "..", "migration/**/*.ts")],
  subscribers: [join(__dirname, "..", "subscriber/**/*.ts")],
};
