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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commandManager_1 = __importStar(require("../lib/commandManager"));
let DDayCount = class DDayCount {
    constructor() {
        this.execute = this.execute.bind(this);
    }
    execute(message, args) {
        const errorMessage = '올바른 명령어를 입력해주세요 \r\n 사용법: `디데이 [년도]년 [숫자]월 [숫자]일`';
        if (!args || args.length !== 3)
            return message.channel.send(errorMessage);
        const [yearString, monthString, dateString] = args;
        const year = Number(yearString.replace('년', ''));
        const month = Number(monthString.replace('월', ''));
        const date = Number(dateString.replace('일', ''));
        if (isNaN(year) || isNaN(month) || isNaN(date))
            return message.channel.send(errorMessage);
        const day = new Date(`${year}-${month}-${date}`);
        const count = this.counter(day);
        let description = `${year}년 ${month}월 ${date}일`;
        let dday;
        if (count > 0) {
            description = `${description}까지 **${Math.abs(count)}일** 남았어요!`;
            dday = `D-${Math.abs(count)}`;
        }
        else if (count == 0) {
            description = `${description}은 오늘이네요!`;
            dday = `D-Day`;
        }
        else {
            // count < 0
            description = `${description}로부터 **${Math.abs(count)}일**이 지났어요!`;
            dday = `D+${Math.abs(count)}`;
        }
        const embed = new discord_js_1.MessageEmbed().setTitle(dday).setDescription(description);
        return message.channel.send(embed);
    }
    counter(date) {
        const now = new Date();
        const distance = date.getTime() - now.getTime();
        const resultDay = Math.floor(distance / (1000 * 60 * 60 * 24));
        return resultDay;
    }
};
__decorate([
    commandManager_1.Execute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message, Object]),
    __metadata("design:returntype", void 0)
], DDayCount.prototype, "execute", null);
DDayCount = __decorate([
    commandManager_1.default(['디데이', 'dday']),
    __metadata("design:paramtypes", [])
], DDayCount);
exports.default = DDayCount;
