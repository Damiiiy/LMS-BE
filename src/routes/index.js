import { Router } from 'express';
import healthRouter from './health.route.js';

const router = Router();

// Mount all routes here
router.use('/health', healthRouter);

export default router;
