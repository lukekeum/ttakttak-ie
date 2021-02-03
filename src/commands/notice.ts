import { Message } from 'discord.js';
import Command, { Execute, TArguments } from '../lib/commandManager';
import guildModel, { IGuild } from '../model/guild.model';
import userModel, { IUser } from '../model/user.model';

interface INoticeForm {
  title?: string;
  description?: string;
  content?: string;
}

type TValue = '제목' | '부제' | '내용';

@Command(['공지'])
export default class Notice {
  private NoticeForm: INoticeForm = {};

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

      if (command === '제목' || command === '부제' || command === '내용') {
        this.setValue(command, args);
        console.log(this.NoticeForm);
        return;
      }

      if (command === '보내기') {
        // TODO: Send message to all servers
      }
    } catch (err) {
      console.error(err);
    }
  }

  private setValue(type: TValue, args: string[]) {
    args.shift();
    const content = args.join(' ');
    switch (type) {
      case '제목':
        this.NoticeForm.title = content;
        return;
      case '부제':
        this.NoticeForm.description = content;
        return;
      case '내용':
        this.NoticeForm.content = content;
        return;
    }
  }
}
