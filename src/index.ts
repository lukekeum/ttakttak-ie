import './config/env';
import bot from './client';
import Database from './config/database';

// login Discord bot
bot.login();

// Connect to database
const database = new Database();

database.connect({ useNewUrlParser: true, useUnifiedTopology: true });
