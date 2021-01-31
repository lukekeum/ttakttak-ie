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
let IndianName = class IndianName {
    execute(message, args) {
        const errorMessage = '올바른 명령어를 입력해주세요 \r\n 사용법: `인디언이름 [년도]년 [숫자]월 [숫자]일`';
        if (!args || args.length !== 3)
            return message.channel.send(errorMessage);
        const [yearString, monthString, dateString] = args;
        const year = yearString.replace('년', '');
        const month = monthString.replace('월', '');
        const date = dateString.replace('일', '');
        let result = '';
        result = `${result}${IndianYear[parseInt(year.charAt(3))]}`;
        result = `${result} ${IndianMonth[parseInt(month) - 1]}`;
        result = `${result}${IndianDate[parseInt(date) - 1]}`;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`${year}년 ${month}월 ${date}일의 인디언 이름입니다`)
            .setDescription(`그 날의 이름은 ||${result}||입니다`);
        message.channel.send(embed);
    }
};
__decorate([
    commandManager_1.Execute,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [discord_js_1.Message, Object]),
    __metadata("design:returntype", void 0)
], IndianName.prototype, "execute", null);
IndianName = __decorate([
    commandManager_1.default(['인디언이름'])
], IndianName);
exports.default = IndianName;
const IndianYear = [
    '시끄러운',
    '푸른',
    '적색',
    '조용한',
    '웅크린',
    '백색',
    '지혜로운',
    '용감한',
    '날카로운',
    '욕심 많은',
];
const IndianMonth = [
    '늑대',
    '태양',
    '양',
    '매',
    '황소',
    '불꽃',
    '나무',
    '달빛',
    '말',
    '돼지',
    '하늘',
    '바람',
];
const IndianDate = [
    '와(과) 함께 춤을',
    '의 기상',
    '은(는) 그림자 속에',
    '',
    '',
    '',
    '의 환생',
    '의 죽음',
    '아래에서',
    '을(를) 보라',
    '이(가) 노래하다',
    '의 그림자',
    '의 일격',
    '에게 쫓기는 남자',
    '의 행진',
    '의 왕',
    '의 유령',
    '을(를) 죽인 자',
    '은(는) 맨날 잠잔다',
    '',
    '의 고향',
    '의 전사',
    '은(는) 나의 친구',
    '의 노래',
    '의 정령',
    '의 파수꾼',
    '의 악마',
    '와(과) 같은 사나이',
    '을(를) 쓰러뜨린 자',
    '의 혼',
    '은(는) 말이 없다',
];
