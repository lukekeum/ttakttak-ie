import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  developer: boolean;
  point: number;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  developer: { type: Boolean, default: false },
  point: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('users', UserSchema);
