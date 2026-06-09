import express from 'express';
import cohortController from '../../controllers/admin/cohortController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Cohorts
 *   description: Admin operations for managing cohorts
 */

/**
 * @swagger
 * /admin/cohorts:
 *   post:
 *     summary: Create a new cohort
 *     tags: [Admin Cohorts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Cohort created successfully
 */
router.post('/', cohortController.createCohort);

/**
 * @swagger
 * /admin/cohorts:
 *   get:
 *     summary: Get all cohorts
 *     tags: [Admin Cohorts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of cohorts
 */
router.get('/', cohortController.getAllCohorts);

/**
 * @swagger
 * /admin/cohorts/{id}:
 *   get:
 *     summary: Get cohort by ID
 *     tags: [Admin Cohorts]
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
 *         description: Cohort retrieved successfully
 */
router.get('/:id', cohortController.getCohortById);

/**
 * @swagger
 * /admin/cohorts/{id}:
 *   put:
 *     summary: Update cohort
 *     tags: [Admin Cohorts]
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
 *         description: Cohort updated successfully
 */
router.put('/:id', cohortController.updateCohort);

/**
 * @swagger
 * /admin/cohorts/{id}:
 *   delete:
 *     summary: Delete cohort
 *     tags: [Admin Cohorts]
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
 *         description: Cohort deleted successfully
 */
router.delete('/:id', cohortController.deleteCohort);

export default router;
