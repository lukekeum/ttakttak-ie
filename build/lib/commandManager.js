"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
function Command(command) {
    return function (constructFN) {
        return class extends constructFN {
            constructor(...args) {
                super(args);
                this.command = command;
            }
        };
    };
}
exports.default = Command;
function Execute(target, _, descriptor) {
    if (target === {})
        return;
    target.execute = descriptor.value;
}
exports.Execute = Execute;
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
