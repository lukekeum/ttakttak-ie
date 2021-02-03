import mongoose, { Schema, Document } from 'mongoose';

interface IGuildRoom {
  id: string;
  type: string;
}

export interface IGuild extends Document {
  id: string;
  channels: Array<IGuildRoom>;
}

export enum EChannelType {
  NOTICE = 'notice',
}

const GuildSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  channels: [
    {
      type: { type: String, required: true, unique: true },
      id: { type: String, required: true, unique: true },
    },
  ],
});

export default mongoose.model<IGuild>('guilds', GuildSchema);
