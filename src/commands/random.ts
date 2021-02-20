import Command, { Execute, TArguments } from '../lib/commandManager';
import { Message } from 'discord.js';
import userModel, { IUser } from '../model/user.model';
import CreateUser from '../events/createUser';
import logger from '../config/logger';

@Command(['주사위'])
export default class Random {
  constructor() {
    this.execute = this.execute.bind(this);
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
    }

    const num = Number(args[0]);

    if (isNaN(num) || num < 1 || num > 6) {
      return message.channel.send(
        '올바른 숫자를 입력해주세요 `명령어: 주사위 {숫자(1~6)}`'
      );
    }

    const rolledNumber = this.randomNumber(6);

    try {
      const user: IUser = await userModel.findOne({ id: message.author.id });

      if (!user) {
        new CreateUser().execute(message);
      }

      message.channel.send(
        `음 주사위가 굴려졌네요!\r\n주사위에서 ${rolledNumber} (이)가 나왔네요!`
      );

      if (rolledNumber === num) {
        user.point += 8;

        message.channel.send(
          `축하드려요! 8점을 획득하셨네요${message.author.username}님!`
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
      const user: IUser = userModel.findOne({ id: message.author.id });

      if (!user) {
        return message.channel.send(`<@!${message.author.id}>님의 포인트: 0점`);
      }

      return message.channel.send(
        `<@!${message.author.id}>님의 포인트: ${user.point}점`
      );
    } catch (err) {
      logger.error(err);
    }
  }
}
