import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
  isManager?: boolean;
  photo?: string;
  googleUser?: boolean;
}

const userSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  isManager: {
    type: Boolean,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  googleUser:{
    type: Boolean,
    required: false
  }
});

const User: Model<IUser> = mongoose.connection.useDb('give&take').model<IUser>('User', userSchema);

export default User;