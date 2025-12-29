import * as applicationsModel from '../models/applicationsModel.js';
import { AppError } from '../utils/AppError.js';

export const getApplications = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const offset = (page - 1) * limit;

		const applications = await applicationsModel.getApplications(userId, limit, offset);
		const hasNextPage = applications.length < limit;

		res.json({ applications, hasNextPage });
	} catch (error) {
		next(error);
	}
};

export const createApplication = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const application = req.body;

		const apply = await applicationsModel.createApplication(userId, application);
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
		const updates = req.body;

		const hasValidUpdates = Object.keys(updates).some((key) => UPDATABLE_FIELDS.includes(key));
		if (!hasValidUpdates) throw new AppError('At least one valid field must be provided for update', 400);

		const application = await applicationsModel.findApplicationById(applicationId);
		if (!application) throw new AppError('Application not found', 404);

		if (application.user_id !== userId) throw new AppError('Not authorized to update this application', 403);

		const update = await applicationsModel.updateApplication(userId, applicationId, updates);
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
