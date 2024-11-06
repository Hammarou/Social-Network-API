import express from 'express';
import mongoose from 'mongoose';

import { mongooseURL } from './config/db.config.js'
import { router } from './routes/index.js';

const app = express();

app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(3000, async () => {
  await mongoose.connect(mongooseURL);
  console.log(`Application started, listening on http://localhost:${PORT}`)
})