import express from 'express';
import resourceController from '../controllers/resourceController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get curated resources for the current user's track
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, resourceController.getResources);

export default router;
