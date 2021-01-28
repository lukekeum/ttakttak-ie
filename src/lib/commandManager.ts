type ICommandAliases = string[] | string;

export type TArguments = string[] | null;

export default function Command(command: ICommandAliases) {
  return function <T extends { new (...args: any[]): {} }>(constructFN: T) {
    return class extends constructFN {
      constructor(...args: any[]) {
        super(args);
      }

      public command = command;
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
 * import Command, { Execute, IArgument } from "../lib/commandManager.ts"
 *
 * @Command(["Hello", "World"])
 * export default class HelloWorld {
 *  @Execute
 *  execute(message: Message, args: IArgument) {
 *  }
 * }
 *
 */
