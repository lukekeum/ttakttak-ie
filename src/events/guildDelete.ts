import { Guild } from 'discord.js';
import logger from '../config/logger';
import Event, { Execute } from '../lib/eventManager';
import guildModel, { IGuild } from '../model/guild.model';

@Event('guildDelete')
export default class GuildDelete {
  @Execute
  public async execute(guild: Guild) {
    try {
      const targetGuild: IGuild | null = await guildModel.findOne({
        id: guild.id,
      });

      if (!targetGuild) return;

      await targetGuild.deleteOne();

      logger.info(`${guild.name}(${guild.id}) data removed`);
    } catch (err) {
      logger.error(err);
    }
  }
}
