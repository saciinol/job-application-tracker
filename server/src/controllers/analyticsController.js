import pool from '../config/db.js';

export const getAnalytics = async (req, res, next) => {
	try {
		const userId = req.user.id;

		const stats = await pool.query(
			`SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Applied') as applied,
        COUNT(*) FILTER (WHERE status = 'Interview') as interview,
        COUNT(*) FILTER (WHERE status = 'Offer') as offer,
        COUNT(*) FILTER (WHERE status = 'Rejected') as rejected
      FROM applications
      WHERE user_id = $1`,
			[userId]
		);

		res.json({ analytics: stats.rows[0] });
	} catch (error) {
		next(error);
	}
};
