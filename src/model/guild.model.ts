import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

interface IGuildUser {
  id: IUser['_id'];
  warn: number;
}

interface IGuildRoom {
  id: string;
  type: string;
}

export interface IGuild extends Document {
  id: string;
  users: Array<IGuildUser>;
  channels: Array<IGuildRoom>;
}

const GuildSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  channels: [
    {
      type: { type: String, required: true, unique: true },
      id: { type: String, required: true, unique: true },
    },
  ],
  users: [
    {
      id: Schema.Types.ObjectId,
      warn: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model<IGuild>('guilds', GuildSchema);
