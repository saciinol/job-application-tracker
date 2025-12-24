import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { register, login, verify } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validators/authValidator.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);
router.get('/verify', authenticateToken, verify);

export default router;
