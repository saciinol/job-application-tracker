import { body } from 'express-validator';

export const createApplicationValidator = [
	body('company_name').trim().notEmpty().withMessage('Company name is required'),
	body('position').trim().notEmpty().withMessage('Position is required'),
	body('status')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isIn(['Applied', 'Interview', 'Offer', 'Rejected']),
	body('location').optional({ nullable: true, checkFalsy: true }).trim(),
	body('salary_range').optional({ nullable: true, checkFalsy: true }).trim(),
	body('job_url')
		.optional({ nullable: true, checkFalsy: true })
		.isURL({ require_protocol: true })
		.withMessage('Invalid URL'),
	body('notes')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isLength({ max: 2000 })
		.withMessage('Notes too long (max 2000 chars)'),
	body('applied_date')
		.notEmpty()
		.withMessage('Applied date is required')
		.bail()
		.isISO8601()
		.withMessage('Invalid date format')
		.toDate(),
	body('deadline')
		.optional({ nullable: true, checkFalsy: true })
		.isISO8601()
		.withMessage('Invalid date format')
		.toDate(),
];

export const updateApplicationValidator = [
	body('company_name')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.notEmpty()
		.withMessage('Company name cannot be empty'),
	body('position')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.notEmpty()
		.withMessage('Position cannot be empty'),
	body('status')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isIn(['Applied', 'Interview', 'Offer', 'Rejected']),
	body('location').optional({ nullable: true, checkFalsy: true }).trim(),
	body('salary_range').optional({ nullable: true, checkFalsy: true }).trim(),
	body('job_url')
		.optional({ nullable: true, checkFalsy: true })
		.isURL({ require_protocol: true })
		.withMessage('Invalid URL'),
	body('notes')
		.optional({ nullable: true, checkFalsy: true })
		.trim()
		.isLength({ max: 2000 })
		.withMessage('Notes too long (max 2000 chars)'),
	body('applied_date')
		.optional({ nullable: true, checkFalsy: true })
		.isISO8601()
		.withMessage('Invalid date format')
		.toDate(),
	body('deadline')
		.optional({ nullable: true, checkFalsy: true })
		.isISO8601()
		.withMessage('Invalid date format')
		.toDate(),
];
