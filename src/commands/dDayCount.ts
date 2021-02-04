import { Message, MessageEmbed } from 'discord.js';
import Command, { Execute, TArguments } from '../lib/commandManager';
import convertDate from '../lib/date';

@Command(['디데이', 'dday'])
export default class DDayCount {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  @Execute
  public execute(message: Message, args: TArguments) {
    const errorMessage =
      '올바른 명령어를 입력해주세요 \r\n 사용법: `디데이 [년도]년 [숫자]월 [숫자]일`';
    if (!args || args.length !== 3) return message.channel.send(errorMessage);

    const [yearString, monthString, dateString] = args;
    const year: number = Number(yearString.replace('년', ''));
    const month: number = Number(monthString.replace('월', ''));
    const date: number = Number(dateString.replace('일', ''));

    if (isNaN(year) || isNaN(month) || isNaN(date))
      return message.channel.send(errorMessage);

    const day = new Date(`${year}-${month}-${date}`);

    const count = this.counter(day);

    let description: string = `${year}년 ${month}월 ${date}일`;
    let dday: string;

    if (count > 0) {
      description = `${description}까지 **${Math.abs(count)}일** 남았어요!`;
      dday = `D-${Math.abs(count)}`;
    } else if (count == 0) {
      description = `${description}은 오늘이네요!`;
      dday = `D-Day`;
    } else {
      // count < 0
      description = `${description}로부터 **${Math.abs(count)}일**이 지났어요!`;
      dday = `D+${Math.abs(count)}`;
    }

    const embed = new MessageEmbed().setTitle(dday).setDescription(description);

    return message.channel.send(embed);
  }

  private counter(date: Date): number {
    const now = convertDate(new Date());
    const distance = date.getTime() - now.getTime();

    const resultDay = Math.floor(distance / (1000 * 60 * 60 * 24));

    return resultDay;
  }
}
