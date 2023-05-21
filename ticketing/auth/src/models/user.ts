import mongoose from 'mongoose';
import { ppid } from 'process';
import { Password } from '../utils/password';

interface UserAttrs {
  email: string;
  password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(user: UserAttrs): UserDoc;
}
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
userSchema.pre('save', async function (done) {
  if (this.isModified('password') && this.password) {
    this.password = await Password.toHash(this.password);
  }
  done();
});
userSchema.statics.build = (user: UserAttrs) => {
  return new User(user);
};
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };
