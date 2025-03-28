import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { timeStamp } from "console";
import path from "path";
import winston from "winston";

const logPath = path.join(__dirname, "../../logs/app.log");
const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN!);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message }) => {
      return `[${timeStamp}] ${level.toLocaleUpperCase()}:${message}`;
    })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: logPath }),
    new LogtailTransport(logtail),
  ],
});

export default logger;
