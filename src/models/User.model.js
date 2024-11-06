import mongoose from "mongoose";

const { model, Schema, Types} = mongoose;

const UserSchema = new Schema({
  'username': {type: String, unique: true, required: true},
  'email': {type: String, unique: true, required: true},
  'thoughts': {type: [Types.ObjectId]},
  'friends': {type: [Types.ObjectId]},
});

UserSchema.virtual('friendCount').get(function(){
  return this.friends.length
});

export const User = model('User', UserSchema);