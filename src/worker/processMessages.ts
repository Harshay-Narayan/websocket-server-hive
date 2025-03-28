import axios from "axios";
import { redis } from "../lib/redis";

export async function processMessages() {
  console.log("Run");
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
      console.log("Messages successfully stored in DB.");
    } catch (error: any) {
      console.log(
        "API response failed: ",
        error.response?.data || error.message
      );
      await redis.lpush(
        "message_queue",
        ...messages.map((message) => JSON.stringify(message))
      );
    }
  } catch (error) {
    console.log("Error occured: " + error);
  }
}
