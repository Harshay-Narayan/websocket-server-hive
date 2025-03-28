import axios from "axios";
import { redis } from "../lib/redis";
import logger from "../utils/logger";

export async function processMessages() {
  logger.info("Process Messages triggered");
  try {
    let messages = [];
    while (messages.length < 50) {
      const data = await redis.rpop("message_queue");
      if (!data) break;
      messages.push(JSON.parse(data));
    }
    if (messages.length === 0) return;
    try {
      const response = await axios.post(
        `${process.env.CLIENT_ORIGIN}/api/messages/store-messages`,
        { messages }
      );
      if (response.status >= 400) {
        throw new Error("API responded with an error.");
      }
      logger.info("Message DB insertion successful");
    } catch (error: any) {
      logger.error("Meesage DB insertion API failed: ", { error });
      await redis.lpush(
        "message_queue",
        ...messages.map((message) => JSON.stringify(message))
      );
    }
    logger.info("Process Messages completed");
  } catch (error) {
    logger.error("Error in processing messages", { error });
  }
}
