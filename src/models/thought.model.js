import mongoose from "mongoose";

const { model, Schema, Types} = mongoose;

const ReactionSchema = new Schema({
  'reactionId': {type: Types.ObjectId, default: new Types.ObjectId()},
  'reactionBody': {type: String, required: true, max: 280},
  'username': {type: String, required: true},
  'createdAt': {type: Date, default: new Date()},
});

const ThoughtSchema = new Schema({
  'thoughtText': {type: String, required: true},
  'createdAt': {type: Date, default: new Date()},
  'username': {type: String, required: true},
  'reactions': {type: [ReactionSchema]},
});

ThoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});

export const Thought = model('Thought', ThoughtSchema);