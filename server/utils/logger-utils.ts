import { createLogger, format, transports } from "winston";

const { printf } = format;

const customFormat = printf(
  (info) =>
    `[${new Date().toLocaleString()}] - [${info.level.toUpperCase()}] : ${
      info.message
    }`
);

export const logger = createLogger({
  level: "info",
  format: customFormat,
  transports: new transports.Console(),
});
