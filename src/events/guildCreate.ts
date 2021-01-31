import { Guild } from 'discord.js';
import { Execute } from '../lib/commandManager';
import Event from '../lib/eventManager';

@Event('guildCreate')
export default class GuildCreate {
  @Execute
  public execute(guild: Guild) {
    // TODO: Add guild_data to database
  }
}
