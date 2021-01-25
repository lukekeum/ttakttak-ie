import Discord, { Client, ClientEvents, Collection, Message } from 'discord.js';
import { readdirSync } from 'fs';

type TArgument = Array<string> | null;
type TExecute<T = void> = ({ message, args }: ICommandParam) => T;
type TEventExecute = (...args: any[]) => void;

interface ICommandParam {
  message: Message;
  args: TArgument;
}
interface ICommand {
  command: Array<string> | string;
  execute: TExecute<void>;
}
interface IEvent {
  eventType: keyof ClientEvents;
  execute: TEventExecute;
}

class Bot {
  public client: Client;

  private commands: Collection<string, TExecute>;
  private prefix: string;

  constructor() {
    // Setup default class values
    this.client = new Discord.Client();
    this.prefix = process.env.PREFIX || '::';

    // Register handler
    this.handleCommand();
    this.handleEvent();

    // Add command to commandChecker
    this.client.on('message', this.commandChecker);
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
      if (typeof Command === 'function') continue;

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
    const eventFiles = readdirSync(eventDir).filter((file) => {
      file.endsWith('.ts');
    });

    for (const file of eventFiles) {
      const Event = require(`./events/${file}`).default;
      if (typeof Event === 'function') continue;

      // Make event object
      const { eventType, execute }: IEvent = new Event();
      this.client.on(eventType, execute);
    }
  }

  public async commandChecker(message: Message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;

    const args = message.content.slice(this.prefix.length).trim().split(/ +/);
    const command = args?.shift()?.toLocaleLowerCase() || '';

    if (!this.commands.has(command)) {
      message.reply('올바른 명령어를 입력해줘');
      return;
    }

    try {
      const func = this.commands.get(command) || function () {};
      await func({ message, args });
    } catch (err) {
      message.reply('에러가 발생했어');
      console.error(err);
    }
  }
}

const bot = new Bot();

export default bot;
