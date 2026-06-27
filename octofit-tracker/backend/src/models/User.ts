import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>('User', UserSchema);
