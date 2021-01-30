import './config/env';
import bot from './client';
import { createConnection } from 'typeorm';
import connectionOptions from './config/database';

// login Discord bot
bot.login();

// Connect to database
createConnection(connectionOptions).then(() =>
  console.log('Database Connected')
);
