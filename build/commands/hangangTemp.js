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
const commandManager_1 = __importStar(require("../lib/commandManager"));
const node_fetch_1 = __importDefault(require("node-fetch"));
let HangangTemp = class HangangTemp {
    async execute(message) {
        const url = 'http://hangang.dkserver.wo.tc/';
        const options = {
            method: 'GET',
        };
        const msg = await message.channel.send('잠시만 기다려주세요');
        try {
            const response = await node_fetch_1.default(url, options);
            const responseOK = response && response.ok;
            const data = (await response.json());
            if (responseOK) {
                const messageEmbed = new discord_js_1.MessageEmbed()
                    .setTitle('한강수온')
                    .setColor('#303136')
                    .setDescription(`현재 한강 물의 온도는 **${data.temp}도**입니다`)
                    .setFooter('최근측정시각', String(msg.author.avatarURL()))
                    .setTimestamp(new Date(data.time));
                await msg.delete();
                message.channel.send(messageEmbed);
            }
        }
        catch (err) {
            console.error(err);
            await msg.edit('오류가 발생했습니다. 개발자에게 문의해주세요');
        }
    }
};
__decorate([
    commandManager_1.Execute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message]),
    __metadata("design:returntype", Promise)
], HangangTemp.prototype, "execute", null);
HangangTemp = __decorate([
    commandManager_1.default(['한강수온', '한강'])
], HangangTemp);
exports.default = HangangTemp;
