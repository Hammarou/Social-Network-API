import { Router } from 'express';
import { Thought } from '../../models/thought.model.js'
import { User } from '../../models/User.model.js'
import { Types } from 'mongoose';

export const router = Router();

router.route('/')
  .get(async (req, res) => {
    res.send(await Thought.find());
  })
  .post(async (req, res) => {
    try{
      const newThoughtData = req.body;
      const user = await User.findById(newThoughtData.userId);
      if(!user) {
        return res.sendStatus(404);
      }
      const newThought = new Thought({
        thoughtText: newThoughtData.thoughtText,
        username: user.username
      });
      const saveResult = await newThought.save();
      const updateResult = await User.findOneAndUpdate(
        {_id: user._id},
        {$push: {thoughts: saveResult._id}}
      )
      res.send(newThought);
    } catch(err) {
      console.error('', err);
      if(err.code = 11000) {
        return res.status(400).send('username or email already exists')
      }
      return res.sendStatus(500);
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const thoughtId = req.params.id;
    try {
      const thought = await Thought.findById(thoughtId);
      if(thought) {
        return res.send(thought);
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  })
  .delete(async (req, res) => {
    const thoughtId = req.params.id;
    try {
      const thought = await Thought.findByIdAndDelete(thoughtId);
      if(thought) {
        const updateStatus = await User.findOneAndUpdate(
          {username: thought.username},
          {$pull: {thoughts: {$eq: thought._id}}}
        )
        return res.send("deleted");
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  })
  .put(async (req, res) => {
    const thoughtId = req.params.id;
      const newThoughtData = req.body;
    try {
      const filter = {_id: thoughtId};
      const thought = await Thought.findOneAndUpdate(
        filter, {thoughtText: newThoughtData.thoughtText},
        {
          returnDocument: "after"
        }
      );
      if(thought) {
        return res.send(thought);
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  });

router.route('/:thoughtId/reactions')
  .post(async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const newReactionData = req.body;
    const userId = newReactionData.userId;
    const reactionBody = newReactionData.reactionBody;

    try {
      const user = await User.findById(userId);
      const thought = await Thought.findById(thoughtId);
      thought.reactions.push({username: user.username, reactionBody})

      await thought.save();

      return res.send('success')
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  })
  
router.route('/:thoughtId/reactions/:reactionId')
  .delete(async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;

    try {
      await Thought.findByIdAndUpdate(thoughtId,
        {$pull: {reactions: {reactionId: {$eq: new Types.ObjectId(reactionId)}}}}
      )
      return res.send('success')
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  });