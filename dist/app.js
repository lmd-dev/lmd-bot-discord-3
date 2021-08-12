"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DotEnv = require("dotenv");
const bot_application_1 = require("./application/bot-application");
DotEnv.config();
const app = new bot_application_1.default();
