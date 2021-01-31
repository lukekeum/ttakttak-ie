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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client_1 = __importDefault(require("../client"));
const commandManager_1 = __importStar(require("../lib/commandManager"));
let Information = class Information {
    constructor() {
        this.execute = this.execute.bind(this);
    }
    execute(message, args) {
        let user;
        try {
            if (args.length > 0 && args) {
                user = this.getUserFromMention(args[0]);
            }
            else {
                user = message.author;
            }
        }
        catch (err) {
            if (err.message === 'Mention not found')
                message.channel.send('정보를 보고자 하는 유저를 맨션해주세요');
            if (err.message === 'User not found')
                message.channel.send('해당 유저를 찾을 수 없습니다');
            return;
        }
        message.channel.send(this.genEmbed(user));
    }
    genEmbed(user) {
        const { username, tag, createdAt } = user;
        const date = `${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 ${createdAt.getDate()}일 ${createdAt.getHours()}시 ${createdAt.getMinutes()}분`;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${username}님의 정보`)
            .setColor('#303136')
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .addField('디스코드 태그', tag, false)
            .addField('탄생일', date, false);
        return embed;
    }
    getUserFromMention(mention) {
        if (!mention.startsWith('<@') || !mention.endsWith('>'))
            throw new Error('Mention not found');
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        const user = client_1.default.client.users.cache.get(mention);
        if (!user)
            throw new Error('User not found');
        return user;
    }
};
__decorate([
    commandManager_1.Execute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message, Object]),
    __metadata("design:returntype", void 0)
], Information.prototype, "execute", null);
Information = __decorate([
    commandManager_1.default(['정보']),
    __metadata("design:paramtypes", [])
], Information);
exports.default = Information;
