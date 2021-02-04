import { Message, MessageEmbed, User } from 'discord.js';
import Command, { Execute, TArguments } from '../lib/commandManager';
import bot from '../client';

@Command(['정보'])
export default class Information {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  @Execute
  public execute(message: Message, args: TArguments) {
    let user: User;
    try {
      if ((args as Array<string>).length > 0 && args) {
        user = this.getUserFromMention(args[0]);
      } else {
        user = message.author;
      }
    } catch (err) {
      if (err.message === 'Mention not found')
        message.channel.send('정보를 보고자 하는 유저를 맨션해주세요');
      if (err.message === 'User not found')
        message.channel.send('해당 유저를 찾을 수 없습니다');
      return;
    }

    return message.channel.send(this.genEmbed(user));
  }

  public genEmbed(user: User): MessageEmbed {
    const { username, tag, createdAt } = user;

    const date = `${createdAt.getFullYear()}년 ${
      createdAt.getMonth() + 1
    }월 ${createdAt.getDate()}일 ${createdAt.getHours()}시 ${createdAt.getMinutes()}분`;

    const embed = new MessageEmbed()
      .setTitle(`${username}님의 정보`)
      .setColor('#303136')
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      .addField('디스코드 태그', tag, false)
      .addField('탄생일', date, false);

    return embed;
  }

  private getUserFromMention(mention: string): User {
    if (!mention.startsWith('<@') || !mention.endsWith('>'))
      throw new Error('Mention not found');
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    const user = bot.client.users.cache.get(mention);

    if (!user) throw new Error('User not found');

    return user;
  }
}
