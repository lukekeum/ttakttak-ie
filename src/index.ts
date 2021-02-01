import './config/env';
import bot from './client';
import Database from './config/database';
import App from './app';

// login Discord bot
bot.login();

// Listen express server in port 3000
const app = new App();
app.listen(() =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);

// Connect to database
const database = new Database();

database.connect({ useNewUrlParser: true, useUnifiedTopology: true });
