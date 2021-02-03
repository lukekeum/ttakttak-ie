import { Message } from 'discord.js';
import logger from '../config/logger';
import Event, { Execute } from '../lib/eventManager';
import userModel, { IUser } from '../model/user.model';

@Event('message')
export default class CreateUser {
  @Execute
  public async execute(message: Message) {
    try {
      const findUser = await userModel.findOne({ id: message.author.id });

      if (message.author.bot) return;

      if (findUser) return;

      const userInput = new userModel({
        id: message.author.id,
      } as IUser);

      await userInput.save();

      logger.info(`${message.author.tag}(${message.author.id}) data created`);
    } catch (err) {
      logger.error(err);
    }
  }
}
