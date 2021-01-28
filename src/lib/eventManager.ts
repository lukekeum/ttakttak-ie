import { ClientEvents } from 'discord.js';

export default function Event<T extends keyof ClientEvents>(eventType: T) {
  return function <T extends { new (...args: any[]): {} }>(constructFN: T) {
    return class extends constructFN {
      constructor(...args: any[]) {
        super(args);
      }

      public event = eventType;
    };
  };
}

export function Execute(
  target: any,
  _: string,
  descriptor: PropertyDescriptor
) {
  if (target === {}) return;
  target.execute = descriptor.value;
}

/*
 * Usage
 *
 * import Event, { Execute } from "../lib/eventManager.ts"
 *
 * @Event("GuildJoinEvent")
 * export default class HelloWorld {
 *  @Execute
 *  execute() {
 *
 *  }
 * }
 *
 */
