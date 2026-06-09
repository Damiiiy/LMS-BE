import express from 'express';
import trackController from '../../controllers/admin/trackController.js';

const router = express.Router();

router.post('/', trackController.createTrack);
router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrackById);
router.put('/:id', trackController.updateTrack);
router.delete('/:id', trackController.deleteTrack);

export default router;
