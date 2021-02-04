import { Message, MessageEmbed, TextChannel } from 'discord.js';
import bot from '../client';
import logger from '../config/logger';
import Command, { Execute, TArguments } from '../lib/commandManager';
import guildModel, { EChannelType, IGuild } from '../model/guild.model';
import userModel, { IUser } from '../model/user.model';

interface INoticeForm {
  title?: string;
  content?: string;
}

type TValue = '제목' | '내용';

@Command(['공지'])
export default class Notice {
  private NoticeForm: INoticeForm = {};
  private message: Message;

  constructor() {
    this.execute = this.execute.bind(this);
  }

  @Execute
  public async execute(message: Message, args: TArguments) {
    try {
      const user: IUser = await userModel.findOne({ id: message.author.id });

      if (!user.developer) return message.channel.send('You are not developer');
      if (!args || args.length < 1) return;

      const command = args[0];

      if (command === '제목' || command === '내용') {
        this.setValue(command, args);
        logger.debug(JSON.stringify(this.NoticeForm));
        return;
      }

      this.message = message;

      if (command === '보내기') {
        // Send message to all guilds
        const client = bot.client;

        const guilds: Array<IGuild> = await guildModel.find();

        for (const guildData of guilds) {
          const guildID = guildData.id;
          const channelID = guildData.channels.find(
            (channel) => channel.type === EChannelType.NOTICE
          )?.id;
          const guild = client.guilds.cache.find(
            (guild) => guild.id === guildID
          );
          if (!guild) continue;

          const channel = guild.channels.cache.find(
            (channel) => channel.id === channelID
          ) as TextChannel;

          return channel.send(this.genEmbed());
        }
      }
    } catch (err) {
      logger.error(err);
    }
  }

  private genEmbed(): MessageEmbed {
    const { title, content } = this.NoticeForm;
    const client = bot.client;
    const embed = new MessageEmbed()
      .setAuthor('택택이 디스코드 봇', `${client.user!.displayAvatarURL()}`)
      .setColor('#ff5447')
      .setTitle(title)
      .setDescription(content)
      .setFooter(
        `${this.message.author.tag} 보냄`,
        `${client.user!.displayAvatarURL()}`
      );

    return embed;
  }

  private setValue(type: TValue, args: string[]) {
    args.shift();
    const content = args.join(' ');
    switch (type) {
      case '제목':
        this.NoticeForm.title = content;
        return;
      case '내용':
        this.NoticeForm.content = content;
        return;
    }
  }
}
