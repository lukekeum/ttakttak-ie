"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
const client_1 = __importDefault(require("./client"));
const database_1 = __importDefault(require("./config/database"));
// login Discord bot
client_1.default.login();
// Connect to database
const database = new database_1.default();
database.connect({ useNewUrlParser: true, useUnifiedTopology: true });
