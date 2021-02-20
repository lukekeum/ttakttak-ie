import { Message } from 'discord.js';
import logger from '../config/logger';
import Event, { Execute } from '../lib/eventManager';
import userModel, { IUser } from '../model/user.model';

@Event('message')
export default class CheckUser {
  @Execute
  public async execute(message: Message) {
    const author = message.author;

    try {
      const user: IUser = await userModel.findOne({ id: author.id });

      if (message.author.bot) return;
      if (!user) return;

      if (user.tag === author.tag) return;

      user.tag = author.tag;

      await user.save();

      logger.info(`${message.author.tag}(${message.author.id}) tag changed`);
    } catch (err) {
      logger.error(err);
    }
  }
}
