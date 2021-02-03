import { connect, disconnect, ConnectOptions } from 'mongoose';
import logger from './logger';

export default class Database {
  public async connect(options: ConnectOptions): Promise<any> {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MongoURI not found');

    try {
      await connect(MONGO_URI, options);
      logger.info('Database connected with mongoose');
    } catch (err) {
      logger.error(err);
    }
  }

  public disconnect() {
    return disconnect();
  }
}
