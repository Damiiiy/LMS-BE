import express from 'express';
import trackController from '../../controllers/admin/trackController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Tracks
 *   description: Admin operations for managing tracks
 */

/**
 * @swagger
 * /admin/tracks:
 *   post:
 *     summary: Create a new track
 *     tags: [Admin Tracks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cohortId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cohortId:
 *                 type: string
 *                 description: ObjectId of the Cohort
 *               youtubePlaylistUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Track created successfully
 */
router.post('/', trackController.createTrack);

/**
 * @swagger
 * /admin/tracks:
 *   get:
 *     summary: Get all tracks
 *     tags: [Admin Tracks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tracks
 */
router.get('/', trackController.getAllTracks);

/**
 * @swagger
 * /admin/tracks/{id}:
 *   get:
 *     summary: Get track by ID
 *     tags: [Admin Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Track retrieved successfully
 */
router.get('/:id', trackController.getTrackById);

/**
 * @swagger
 * /admin/tracks/{id}:
 *   put:
 *     summary: Update track
 *     tags: [Admin Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cohortId:
 *                 type: string
 *                 description: ObjectId of the Cohort
 *               youtubePlaylistUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Track updated successfully
 */
router.put('/:id', trackController.updateTrack);

/**
 * @swagger
 * /admin/tracks/{id}:
 *   delete:
 *     summary: Delete track
 *     tags: [Admin Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Track deleted successfully
 */
router.delete('/:id', trackController.deleteTrack);

export default router;
