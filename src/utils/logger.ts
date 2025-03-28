import path from "path";
import winston from "winston";

const logPath = path.join(__dirname, "../../logs/app.log");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toLocaleUpperCase()}:${message}`;
    })
  ),
  defaultMeta: { service: "message-worker" },
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }),
    }),
  ],
});

export default logger;
