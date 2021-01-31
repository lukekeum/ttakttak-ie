import { connect, disconnect, ConnectOptions } from 'mongoose';

export default class Database {
  public async connect(options: ConnectOptions): Promise<any> {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MongoURI not found');

    try {
      await connect(MONGO_URI, options);
      console.log('Database Connected');
    } catch (err) {
      console.error(err);
    }
  }

  public disconnect() {
    return disconnect();
  }
}
