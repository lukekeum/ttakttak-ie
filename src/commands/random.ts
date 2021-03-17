import Command, { Execute, TArguments } from '../lib/commandManager';
import { Guild, Message, User } from 'discord.js';
import userModel, { IUser } from '../model/user.model';
import CreateUser from '../events/createUser';
import logger from '../config/logger';
import _ from 'lodash';
import bot from '../client';

@Command(['주사위'])
export default class Random {
  constructor() {
    this.execute = this.execute.bind(this);
    this.checkPoint = this.checkPoint.bind(this);
    this.randomNumber = this.randomNumber.bind(this);
    this.userRank = this.userRank.bind(this);
  }

  @Execute
  public async execute(message: Message, args: TArguments) {
    if (!args || args.length !== 1) {
      return message.channel.send(
        '들어갈 값을 입력하시지 않으신거 같아요! `명령어: 주사위 {숫자(1~6)}`'
      );
    }

    if (args[0] === '점수') {
      return this.checkPoint(message);
    } else if (args[0] === '순위') {
      return this.userRank(message);
    }

    if (message.channel.type === 'dm') {
      return message.reply('개인DM에서는 사용 할 수 없는 명령어입니다');
    }

    const num = Number(args[0]);

    if (isNaN(num) || num < 1 || num > 6) {
      return message.channel.send(
        '올바른 숫자를 입력해주세요 `명령어: 주사위 {숫자(1~6)}`'
      );
    }

    const rolledNumber = this.randomNumber(6);

    try {
      const user: IUser | null = await userModel.findOne({
        id: message.author.id,
      });

      if (!user) {
        return new CreateUser().execute(message);
      }

      message.channel.send(
        `음 주사위가 굴려졌네요!\r\n주사위에서 ${rolledNumber} (이)가 나왔네요!`
      );

      if (rolledNumber === num) {
        const increaseAmount = this.randomNumber(10) + 14; // 15~25

        user.point += increaseAmount;

        message.channel.send(
          `축하드려요! ${increaseAmount}점을 획득하셨네요 <@!${message.author.id}>`
        );
      } else {
        const reduceAmount = this.randomNumber(5);

        user.point -= reduceAmount;

        message.channel.send(
          `${reduceAmount}만큼의 점수가 차감되었어요! 하지만 아직 기회는 많으니 한 번 다시 해보자구요 <@!${message.author.id}>`
        );
      }

      await user.save();
    } catch (err) {
      logger.error(err);
    }
  }

  private randomNumber(size: number) {
    return Math.floor(Math.random() * size) + 1;
  }

  private async checkPoint(message: Message) {
    try {
      const user: IUser | null = await userModel.findOne({
        id: message.author.id,
      });

      if (!user) {
        return message.channel.send(`<@!${message.author.id}>님의 포인트: 0점`);
      }

      return message.channel.send(
        `<@!${message.author.id}>님의 포인트: ${user.point || 0}점`
      );
    } catch (err) {
      logger.error(err);
    }
  }

  private async userRank(message: Message) {
    try {
      const users = await userModel.find();
      let rankMessage = '현재 포인트 순위입니다 \r\n```css\r\n';

      const sortedByPoint: IUser[] = _.sortBy(users, 'point')
        .filter((usr) => usr.point && usr.point !== 0)
        .reverse();

      let number = 0;

      for (const userData of sortedByPoint) {
        if (!userData.tag) continue;
        number += 1;
        rankMessage =
          rankMessage +
          `[${number}] ${userData.tag} -> ${userData.point}점\r\n`;

        if (number >= 15) break;
      }
      rankMessage = rankMessage + '```';

      message.channel.send(rankMessage);
    } catch (err) {
      logger.error(err);
    }
  }
}
