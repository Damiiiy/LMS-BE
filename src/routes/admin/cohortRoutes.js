import express from 'express';
import cohortController from '../../controllers/admin/cohortController.js';

const router = express.Router();

router.post('/', cohortController.createCohort);
router.get('/', cohortController.getAllCohorts);
router.get('/:id', cohortController.getCohortById);
router.put('/:id', cohortController.updateCohort);
router.delete('/:id', cohortController.deleteCohort);

export default router;
