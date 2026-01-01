import * as applicationsModel from '../models/applicationsModel.js';
import { AppError } from '../utils/AppError.js';

export const getApplications = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { page = 1, limit = 10, search, status } = req.query;

		const pageNum = Number(page);
		const limitNum = Number(limit);

		if (!Number.isInteger(pageNum) || !Number.isInteger(limitNum) || pageNum < 1 || limitNum > 50) {
			throw new AppError('Invalid pagination', 400);
		}

		const offset = (pageNum - 1) * limitNum;

		const { items, total } = await applicationsModel.getApplications(userId, {
			limit: limitNum,
			offset,
			search,
			status,
		});

		res.json({
			items,
			total,
			page: pageNum,
			totalPages: Math.ceil(total / limitNum),
		});
	} catch (error) {
		next(error);
	}
};

export const createApplication = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const data = req.body;

		const apply = await applicationsModel.createApplication(userId, data);
		res.status(201).json({ application: apply });
	} catch (error) {
		next(error);
	}
};

export const updateApplication = async (req, res, next) => {
	const UPDATABLE_FIELDS = [
		'company_name',
		'position',
		'status',
		'location',
		'salary_range',
		'job_url',
		'notes',
		'applied_date',
		'deadline',
	];

	try {
		const userId = req.user.id;
		const applicationId = parseInt(req.params.id);
		const data = req.body;

		const hasValidUpdates = Object.keys(data).some((key) => UPDATABLE_FIELDS.includes(key));
		if (!hasValidUpdates) throw new AppError('At least one valid field must be provided for update', 400);

		const application = await applicationsModel.findApplicationById(applicationId);
		if (!application) throw new AppError('Application not found', 404);

		if (application.user_id !== userId) throw new AppError('Not authorized to update this application', 403);

		const update = await applicationsModel.updateApplication(userId, applicationId, data);
		if (!update) throw new AppError('Application not found', 404);
		res.json({ application: update });
	} catch (error) {
		next(error);
	}
};

export const deleteApplication = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const applicationId = parseInt(req.params.id);

		const application = await applicationsModel.findApplicationById(applicationId);
		if (!application) throw new AppError('Application not found', 404);

		if (application.user_id !== userId) throw new AppError('Not authorized to delete this application', 403);

		await applicationsModel.deleteApplication(applicationId);
		res.json({ message: 'Application deleted successfully' });
	} catch (error) {
		next(error);
	}
};
