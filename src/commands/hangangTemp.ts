import { Message, MessageEmbed } from 'discord.js';
import Command, { Execute } from '../lib/commandManager';
import fetch, { RequestInit } from 'node-fetch';
import logger from '../config/logger';

interface IResponse {
  result: string;
  temp: string;
  time: string;
}

@Command(['한강수온', '한강'])
export default class HangangTemp {
  @Execute
  public async execute(message: Message) {
    const url = 'http://hangang.dkserver.wo.tc/';
    const options: RequestInit = {
      method: 'GET',
    };
    const msg = await message.channel.send('잠시만 기다려주세요');
    try {
      const response = await fetch(url, options);
      const responseOK = response && response.ok;
      const data = (await response.json()) as IResponse;
      if (responseOK) {
        const messageEmbed = new MessageEmbed()
          .setTitle('한강수온')
          .setColor('#303136')
          .setDescription(`현재 한강 물의 온도는 **${data.temp}도**입니다`)
          .setFooter('최근측정시각', String(msg.author.avatarURL()))
          .setTimestamp(new Date(data.time));

        await msg.delete();
        message.channel.send(messageEmbed);
      }
    } catch (err) {
      console.error(err);
      await msg.edit('오류가 발생했습니다. 개발자에게 문의해주세요');
    }
  }
}
