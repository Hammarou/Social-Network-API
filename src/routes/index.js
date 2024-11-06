import { Router } from 'express';

import { router as userRouter } from './user/index.js';
import { router as thoughtRouter } from './thought/index.js';

export const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);