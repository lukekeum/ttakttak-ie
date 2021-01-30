import { ConnectionOptions } from 'typeorm';
import entities from '../entity';

const connectionOptions: ConnectionOptions = {
  entities,
  type: 'postgres',
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  dropSchema: true,
  port: 5432,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
};

export default connectionOptions;
