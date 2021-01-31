"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
function Event(eventType) {
    return function (constructFN) {
        return class extends constructFN {
            constructor(...args) {
                super(args);
                this.event = eventType;
            }
        };
    };
}
exports.default = Event;
function Execute(target, _, descriptor) {
    if (target === {})
        return;
    target.execute = descriptor.value;
}
exports.Execute = Execute;
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
