import { timeStamp } from "console";
import path from "path";
import winston from "winston";

const logPath = path.join(__dirname, "../../logs/app.log");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message }) => {
      return `[${timeStamp}] ${level.toLocaleUpperCase()}:${message}`;
    })
  ),
  defaultMeta: { service: "user-service" },
  transports: [new winston.transports.Console()],
});

export default logger;
