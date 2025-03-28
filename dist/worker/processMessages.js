"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessages = processMessages;
const axios_1 = __importDefault(require("axios"));
const redis_1 = require("../lib/redis");
const logger_1 = __importDefault(require("../utils/logger"));
function processMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        logger_1.default.info("Process Messages triggered");
        try {
            let messages = [];
            while (messages.length < 50) {
                const data = yield redis_1.redis.rpop("message_queue");
                if (!data)
                    break;
                messages.push(JSON.parse(data));
            }
            if (messages.length === 0)
                return;
            try {
                const response = yield axios_1.default.post(`${process.env.CLIENT_ORIGIN}/api/messages/store-messages`, { messages });
                if (response.status >= 400) {
                    throw new Error("API responded with an error.");
                }
                logger_1.default.info("Message DB insertion successful");
            }
            catch (error) {
                logger_1.default.error("Meesage DB insertion API failed: ", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                yield redis_1.redis.lpush("message_queue", ...messages.map((message) => JSON.stringify(message)));
            }
            logger_1.default.info("Process Messages completed");
        }
        catch (error) {
            logger_1.default.error("Error occured: " + error);
        }
    });
}
