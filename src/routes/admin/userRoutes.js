import express from 'express';
import userController from '../../controllers/admin/userController.js';

const router = express.Router();

router.post('/provision', userController.provisionUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
