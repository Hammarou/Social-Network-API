import mongoose from "mongoose";

const { model, Schema, Types } = mongoose;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  thoughts: { type: [Types.ObjectId] },
  friends: { type: [Types.ObjectId] },
});

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Middleware to check for existing username or email
UserSchema.pre("save", async function (next) {
  const user = this;
  const existingUser = await User.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });

  if (existingUser) {
    const error = new Error("Username or Email already exists");
    return next(error);
  }
  next();
});

export const User = model("User", UserSchema);
User.createIndexes();
