import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('users', UserSchema);
