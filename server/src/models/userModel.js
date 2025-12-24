import pool from '../config/db.js';

export const createUser = async (email, password, name) => {
	const result = await pool.query(
		`INSERT INTO users(email, password, name)
    VALUES ($1, $2, $3)
    RETURNING id, email, name`,
		[email, password, name]
	);
	return result.rows[0];
};

export const findByEmail = async (email) => {
	const result = await pool.query(
		`SELECT * FROM users
    WHERE email = $1`,
		[email]
	);
	return result.rows[0];
};

export const findById = async (id) => {
	const result = await pool.query(
		`SELECT * FROM users
    WHERE id = $1`,
		[id]
	);
	return result.rows[0];
};
