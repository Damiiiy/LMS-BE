import express from 'express';
import cohortRoutes from './cohortRoutes.js';
import trackRoutes from './trackRoutes.js';
import resourceRoutes from './resourceRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/cohorts', cohortRoutes);
router.use('/tracks', trackRoutes);
router.use('/resources', resourceRoutes);
router.use('/users', userRoutes);

export default router;
