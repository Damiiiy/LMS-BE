// Routes - no business logic per spec
const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/login - Login endpoint
router.post('/login', authController.login);

// POST /api/auth/logout - Logout endpoint (protected route)
router.post('/logout', authenticate, authController.logout);

// GET /api/auth/me - Get current user (protected route)
router.get('/me', authenticate, authController.getMe);

module.exports = router;