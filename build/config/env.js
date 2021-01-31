"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const { NODE_ENV } = process.env;
dotenv_1.default.config({
    path: path_1.default.resolve(process.cwd(), NODE_ENV === 'development' ? '.env.development' : '.env'),
});
