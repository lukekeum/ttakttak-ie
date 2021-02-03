import { Message } from 'discord.js';
import Event, { Execute } from '../lib/eventManager';
import userModel, { IUser } from '../model/user.model';

@Event('message')
export default class CreateUser {
  @Execute
  public async execute(message: Message) {
    try {
      const findUser = await userModel.findOne({ id: message.author.id });

      if (findUser) return;

      const userInput = new userModel({
        id: message.author.id,
      } as IUser);

      await userInput.save();
    } catch (err) {
      console.error(err);
    }
  }
}
