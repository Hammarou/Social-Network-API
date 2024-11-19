import { Router } from 'express';
import { User } from '../../models/User.model.js'
import { Thought } from '../../models/thought.model.js';
import { Types } from 'mongoose';

export const router = Router();

router.route('/')
  .get(async (req, res) => {
    res.send(await User.find());
  })
  .post(async (req, res) => {
    try{
      const newUserData = req.body;
      const newUser = new User(newUserData);
      newUser.isNew = true;
      const saveResult = await newUser.save();
      res.send(saveResult);
    } catch(err) {
      console.error(err);
      if(err.code = 11000) {
        return res.status(400).send('username or email already exists')
      }
      return res.sendStatus(500);
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if(user) {
        return res.send(user);
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findByIdAndDelete(userId);
      if(user) {
        await Thought.deleteMany({
          _id: {$in: user.thoughts}
        })
        return res.send("deleted");
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  })
  .put(async (req, res) => {
    const userId = req.params.id;
      const newUserData = req.body;
    try {
      const filter = {_id: userId};
      const user = await User.findOneAndUpdate(
        filter, newUserData,
        {
          returnDocument: "after"
        }
      );
      if(user) {
        return res.send(user);
      }
    }catch(err) {
      console.error(err)
    }
    return res.sendStatus(404);
  });

  router.route('/:userId/friends/:friendId')
    .post(async (req, res) => {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      try {
        const results = await User.findByIdAndUpdate(
          {_id: new Types.ObjectId(userId)},
          {$addToSet: {friends: new Types.ObjectId(friendId)}}
        )

        return res.send('success')
      }catch(err) {
        console.error(err)
      }
      return res.sendStatus(404);
    })
    .delete(async (req, res) => {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      try {
        const results = await User.findByIdAndUpdate(
          {_id: new Types.ObjectId(userId)},
          {$pull: {friends: new Types.ObjectId(friendId)}}
        )

        return res.send('success')
      }catch(err) {
        console.error(err)
      }
      return res.sendStatus(404);});