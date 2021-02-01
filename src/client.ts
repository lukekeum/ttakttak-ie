import Discord, { Client, ClientEvents, Collection, Message } from 'discord.js';
import { readdirSync } from 'fs';

type TArgument = Array<string> | null;
type TExecute<T = void> = (message: Message, args: TArgument) => T;
type TEventExecute = (...args: any[]) => void;

interface ICommand {
  command: Array<string> | string;
  execute: TExecute<void>;
}
interface IEvent {
  event: keyof ClientEvents;
  execute: TEventExecute;
}

class Bot {
  public client: Client;

  private prefix: string;
  private commands = new Collection<string, TExecute>();

  constructor() {
    // Setup default class values
    this.client = new Discord.Client();
    this.prefix = String(process.env.PREFIX || '::');

    // Register handler
    this.handleCommand();
    this.handleEvent();

    // Add command to commandChecker
    this.client.on('message', this.commandChecker.bind(this));
  }

  public login() {
    // Get TOEKN from process.env
    const { TOKEN } = process.env;
    if (!TOKEN) throw new Error('There are no token inside your env file');

    this.client.login(TOKEN).then(() => console.log('Bot is running now')); // Login client with process.env.TOKEN
  }

  private handleCommand() {
    const commandDir = './src/commands';
    const commandFiles = readdirSync(commandDir).filter((file) =>
      file.endsWith('.ts')
    );

    for (const file of commandFiles) {
      const Command = require(`./commands/${file}`).default;

      // Make command object
      const { command: cmd, execute }: ICommand = new Command();

      // Register command
      if (typeof cmd === 'string') this.commands.set(cmd, execute);
      else {
        for (const command of cmd) {
          this.commands.set(command, execute);
        }
      }
    }
  }

  private handleEvent() {
    const eventDir = './src/events';
    const eventFiles = readdirSync(eventDir).filter((file) =>
      file.endsWith('.ts')
    );

    for (const file of eventFiles) {
      const Event = require(`./events/${file}`).default;

      // Make event object
      const { event, execute }: IEvent = new Event();
      this.client.on(event, execute);
    }
  }

  private async commandChecker(message: Message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const command = args?.shift()?.toLocaleLowerCase() || '';

    if (!this.commands.has(command)) {
      // TODO: Add help command
      return;
    }

    try {
      const func = this.commands.get(command) || function () {};
      await func(message, args);
    } catch (err) {
      message.reply('에러가 발생했어');
      console.error(err);
    }
  }
}

const bot = new Bot();

export default bot;
