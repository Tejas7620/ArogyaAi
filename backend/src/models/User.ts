import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: "",
  },
  photoURL: {
    type: String,
    default: "",
  },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IUser>("User", UserSchema);