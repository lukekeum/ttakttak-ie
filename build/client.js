"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const fs_1 = require("fs");
class Bot {
    constructor() {
        this.commands = new discord_js_1.Collection();
        // Setup default class values
        this.client = new discord_js_1.default.Client();
        this.prefix = String(process.env.PREFIX || '::');
        // Register handler
        this.handleCommand();
        this.handleEvent();
        // Add command to commandChecker
        this.client.on('message', this.commandChecker.bind(this));
    }
    login() {
        // Get TOEKN from process.env
        const { TOKEN } = process.env;
        if (!TOKEN)
            throw new Error('There are no token inside your env file');
        this.client.login(TOKEN).then(() => console.log('Bot is running now')); // Login client with process.env.TOKEN
    }
    handleCommand() {
        const commandDir = './src/commands';
        const commandFiles = fs_1.readdirSync(commandDir).filter((file) => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const Command = require(`./commands/${file}`).default;
            // Make command object
            const { command: cmd, execute } = new Command();
            // Register command
            if (typeof cmd === 'string')
                this.commands.set(cmd, execute);
            else {
                for (const command of cmd) {
                    this.commands.set(command, execute);
                }
            }
        }
    }
    handleEvent() {
        const eventDir = './src/events';
        const eventFiles = fs_1.readdirSync(eventDir).filter((file) => {
            file.endsWith('.ts');
        });
        for (const file of eventFiles) {
            const Event = require(`./events/${file}`).default;
            if (typeof Event === 'function')
                continue;
            // Make event object
            const { eventType, execute } = new Event();
            this.client.on(eventType, execute);
        }
    }
    async commandChecker(message) {
        if (!message.content.startsWith(this.prefix) || message.author.bot)
            return;
        const args = message.content.slice(this.prefix.length).trim().split(/ +/);
        const command = args?.shift()?.toLocaleLowerCase() || '';
        if (!this.commands.has(command)) {
            // TODO: Add help command
            return;
        }
        try {
            const func = this.commands.get(command) || function () { };
            await func(message, args);
        }
        catch (err) {
            message.reply('에러가 발생했어');
            console.error(err);
        }
    }
}
const bot = new Bot();
exports.default = bot;
