import { Message, MessageEmbed } from 'discord.js';
import Command, { Execute, TArguments } from '../lib/commandManager';

@Command(['급식'])
export default class SchoolLunch {
  private helpEmbed: MessageEmbed = this.helpEmbedGenorator();

  constructor() {
    this.execute = this.execute.bind(this);
    this.helpEmbedGenorator = this.helpEmbedGenorator.bind(this);
  }

  @Execute
  public async execute(message: Message, args: TArguments) {
    if (!args || args.length < 1) {
      return message.channel.send(this.helpEmbed);
    }

    // TODO: Make other function with arguments
    switch (args[0]) {
      case '':
        break;
      default:
        return message.channel.send(this.helpEmbed);
    }

    return;
  }

  private helpEmbedGenorator(): MessageEmbed {
    // TODO: Make help embed
    const embed = new MessageEmbed();

    return embed;
  }
}
