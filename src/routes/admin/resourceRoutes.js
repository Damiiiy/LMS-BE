import express from 'express';
import resourceController from '../../controllers/admin/resourceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Resources
 *   description: Admin operations for managing resources
 */

/**
 * @swagger
 * /admin/resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Admin Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - trackId
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               type:
 *                 type: string
 *                 default: 'Link'
 *               trackId:
 *                 type: string
 *                 description: ObjectId of the Track
 *     responses:
 *       201:
 *         description: Resource created successfully
 */
router.post('/', resourceController.createResource);

/**
 * @swagger
 * /admin/resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Admin Resources]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get('/', resourceController.getAllResources);

/**
 * @swagger
 * /admin/resources/{id}:
 *   get:
 *     summary: Get resource by ID
 *     tags: [Admin Resources]
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
 *         description: Resource retrieved successfully
 */
router.get('/:id', resourceController.getResourceById);

/**
 * @swagger
 * /admin/resources/{id}:
 *   put:
 *     summary: Update resource
 *     tags: [Admin Resources]
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
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               type:
 *                 type: string
 *               trackId:
 *                 type: string
 *                 description: ObjectId of the Track
 *     responses:
 *       200:
 *         description: Resource updated successfully
 */
router.put('/:id', resourceController.updateResource);

/**
 * @swagger
 * /admin/resources/{id}:
 *   delete:
 *     summary: Delete resource
 *     tags: [Admin Resources]
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
 *         description: Resource deleted successfully
 */
router.delete('/:id', resourceController.deleteResource);

export default router;
