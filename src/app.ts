import * as DotEnv from "dotenv";
import BotApplication from "./application/bot-application";

DotEnv.config();

const app = new BotApplication();