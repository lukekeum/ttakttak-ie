import { Guild } from 'discord.js';
import logger from '../config/logger';
import Event, { Execute } from '../lib/eventManager';

import GuildModel, { EChannelType, IGuild } from '../model/guild.model';

interface IGuildInput {
  id: IGuild['id'];
  channels: IGuild['channels'];
}

@Event('guildCreate')
export default class GuildCreate {
  @Execute
  public async execute(guild: Guild) {
    // Add guild_data to database
    try {
      const findGuild = await GuildModel.findOne({ id: guild.id });

      if (findGuild) return;

      const channel = guild.channels.cache.find(
        (channel) => channel.type === 'text' || channel.type === 'news'
      );
      if (!channel) return;

      const guildInput = new GuildModel({
        id: guild.id,
        channels: [{ type: EChannelType.NOTICE, id: channel.id }],
      } as IGuildInput);

      await guildInput.save();

      logger.info(`${guild.name}(${guild.id}) data created`);
    } catch (err) {
      logger.error(err);
    }
  }
}
