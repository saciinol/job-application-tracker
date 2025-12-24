import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;
dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const pool = new Pool({
	host: DB_HOST,
	port: DB_PORT,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	ssl: isDev ? false : { rejectUnauthorized: false },
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

if (isDev) {
	pool.on('connect', () => console.log('Connected to PostgreSQL'));
}

pool.on('error', (error) => {
	console.error('Unexpected database error:', error);
});

const gracefulShutdown = async () => {
	try {
		await pool.end();
		if (isDev) console.log('Database pool closed');
		process.exit(0);
	} catch (error) {
		console.error('Error during shutdown:', error);
		process.exit(1);
	}
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default pool;
