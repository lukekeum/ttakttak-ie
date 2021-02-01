import { Guild } from 'discord.js';
import Event, { Execute } from '../lib/eventManager';

import GuildModel, { IGuild } from '../model/guild.model';

interface IGuildInput {
  id: IGuild['id'];
  users: IGuild['users'];
  channels: IGuild['channels'];
}

@Event('guildCreate')
export default class GuildCreate {
  @Execute
  public async execute(guild: Guild) {
    console.log('runned');
    // Add guild_data to database
    try {
      const findGuild = await GuildModel.findOne({ id: guild.id });

      if (findGuild) {
        console.log(2);
        return;
      }

      const channel = guild.channels.cache.find(
        (channel) => channel.type === 'text' || channel.type === 'news'
      );
      if (!channel) {
        console.log(1);
        return;
      }

      const guildInput = new GuildModel({
        id: guild.id,
        channels: [{ type: 'patch-channel', id: channel.id }],
      } as IGuildInput);

      await guildInput.save();

      console.log('Data saved');
    } catch (err) {
      console.error(err);
    }
  }
}
