import { body } from 'express-validator';

export const registerValidator = [
	body('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	body('name').trim().notEmpty().withMessage('Name is required'),
];

export const loginValidator = [
	body('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
	body('password').notEmpty().withMessage('Password is required'),
];
