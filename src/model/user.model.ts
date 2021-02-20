import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  developer: boolean;
  tag: string;
  point: number;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  developer: { type: Boolean, default: false },
  tag: { type: String },
  point: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('users', UserSchema);
