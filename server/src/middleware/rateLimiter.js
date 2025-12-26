import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15, // 5 req per window
	message: 'Too many attempts, please try again later',
	standardHeaders: true,
	legacyHeaders: false,
});
