import { Message, MessageEmbed } from 'discord.js';
import Command, { Execute, TArguments } from '../lib/commandManager';

@Command(['인디언이름'])
export default class IndianName {
  @Execute
  public execute(message: Message, args: TArguments) {
    const errorMessage =
      '올바른 명령어를 입력해주세요 \r\n 사용법: `인디언이름 [년도]년 [숫자]월 [숫자]일`';
    if (!args || args.length !== 3) return message.channel.send(errorMessage);

    const [yearString, monthString, dateString] = args;
    const year = yearString.replace('년', '');
    const month = monthString.replace('월', '');
    const date = dateString.replace('일', '');

    let result: string = '';

    result = `${result}${IndianYear[parseInt(year.charAt(3))]}`;
    result = `${result} ${IndianMonth[parseInt(month) - 1]}`;
    result = `${result}${IndianDate[parseInt(date) - 1]}`;

    const embed = new MessageEmbed()
      .setTitle(`${year}년 ${month}월 ${date}일의 인디언 이름입니다`)
      .setDescription(`그 날의 이름은 ||${result}||입니다`);

    message.channel.send(embed);
  }
}

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
