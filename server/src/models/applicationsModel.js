import pool from '../config/db.js';

export const getApplications = async (userId, { limit = 10, offset = 0, search, status } = {}) => {
	const conditions = [`user_id = $1`];
	const values = [userId];

	if (search?.trim()) {
		values.push(`%${search}%`);
		conditions.push(`(company_name || ' ' || position) ILIKE $${values.length}`);
	}

	const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
	if (status && validStatuses.includes(status)) {
		values.push(status);
		conditions.push(`status = $${values.length}`);
	}

	const whereClause = conditions.length > 1 ? `WHERE ${conditions.join(' AND ')}` : `WHERE ${conditions[0]}`;

	const dataValues = [...values, limit, offset];

	const dataQuery = `
    SELECT *
    FROM applications
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${dataValues.length - 1}
    OFFSET $${dataValues.length}`;

	const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM applications
    ${whereClause}`;

	const [dataResult, countResult] = await Promise.all([
		pool.query(dataQuery, dataValues),
		pool.query(countQuery, values),
	]);

	return {
		items: dataResult.rows,
		total: countResult.rows[0].total,
	};
};

export const createApplication = async (userId, application) => {
	const fields = ['user_id', 'company_name', 'position', 'applied_date'];
	const params = ['$1', '$2', '$3', '$4'];
	const values = [userId, application.company_name, application.position, application.applied_date];
	let paramCount = 5;

	if (application.status !== undefined) {
		fields.push(`status`);
		params.push(`$${paramCount}`);
		values.push(application.status);
		paramCount++;
	}
	if (application.location !== undefined) {
		fields.push(`location`);
		params.push(`$${paramCount}`);
		values.push(application.location);
		paramCount++;
	}
	if (application.salary_range !== undefined) {
		fields.push(`salary_range`);
		params.push(`$${paramCount}`);
		values.push(application.salary_range);
		paramCount++;
	}
	if (application.job_url !== undefined) {
		fields.push(`job_url`);
		params.push(`$${paramCount}`);
		values.push(application.job_url);
		paramCount++;
	}
	if (application.notes !== undefined) {
		fields.push(`notes`);
		params.push(`$${paramCount}`);
		values.push(application.notes);
		paramCount++;
	}
	if (application.deadline !== undefined) {
		fields.push(`deadline`);
		params.push(`$${paramCount}`);
		values.push(application.deadline);
		paramCount++;
	}

	const query = `
    INSERT INTO applications(${fields.join(', ')})
    VALUES (${params.join(', ')})
    RETURNING *`;

	const result = await pool.query(query, values);
	return result.rows[0];
};

export const updateApplication = async (userId, applicationId, updates) => {
	const fields = [];
	const values = [];
	let paramCount = 1;

	if (updates.company_name !== undefined) {
		fields.push(`company_name = $${paramCount}`);
		values.push(updates.company_name);
		paramCount++;
	}

	if (updates.position !== undefined) {
		fields.push(`position = $${paramCount}`);
		values.push(updates.position);
		paramCount++;
	}

	if (updates.status !== undefined) {
		fields.push(`status = $${paramCount}`);
		values.push(updates.status);
		paramCount++;
	}

	if (updates.location !== undefined) {
		fields.push(`location = $${paramCount}`);
		values.push(updates.location);
		paramCount++;
	}

	if (updates.salary_range !== undefined) {
		fields.push(`salary_range = $${paramCount}`);
		values.push(updates.salary_range);
		paramCount++;
	}

	if (updates.job_url !== undefined) {
		fields.push(`job_url = $${paramCount}`);
		values.push(updates.job_url);
		paramCount++;
	}

	if (updates.notes !== undefined) {
		fields.push(`notes = $${paramCount}`);
		values.push(updates.notes);
		paramCount++;
	}

	if (updates.applied_date !== undefined) {
		fields.push(`applied_date = $${paramCount}`);
		values.push(updates.applied_date);
		paramCount++;
	}

	if (updates.deadline !== undefined) {
		fields.push(`deadline = $${paramCount}`);
		values.push(updates.deadline);
		paramCount++;
	}

	// Prevent empty updates
	if (fields.length === 0) {
		throw new Error('No valid fields provided for update');
	}

	fields.push(`updated_at = CURRENT_TIMESTAMP`);

	// WHERE params
	values.push(applicationId);
	values.push(userId);

	const query = `
		UPDATE applications
		SET ${fields.join(', ')}
		WHERE id = $${paramCount}
		  AND user_id = $${paramCount + 1}
		RETURNING *;
	`;

	const result = await pool.query(query, values);
	return result.rows[0];
};

export const deleteApplication = async (applicationId) => {
	await pool.query(
		`DELETE FROM applications
    WHERE id = $1`,
		[applicationId]
	);
};

export const findApplicationById = async (applicationId) => {
	const result = await pool.query(`SELECT * FROM applications WHERE id = $1`, [applicationId]);
	return result.rows[0];
};
