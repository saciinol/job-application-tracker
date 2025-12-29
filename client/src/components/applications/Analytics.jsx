import { useEffect, useState } from 'react';
import { analyticsAPI } from '../../services/analyticsAPI';
import StatsCard from './StatsCard';

const Analytics = () => {
	const [analytics, setAnalytics] = useState(null);

	const fetchAnalytics = async () => {
		try {
			const { data } = await analyticsAPI.get();
			setAnalytics(data.analytics);
		} catch (error) {
			console.error('Failed to load analytics', error);
		}
	};

	useEffect(() => {
		fetchAnalytics();
	}, []);

	return (
		analytics && (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
				<StatsCard title="Total Applications" value={analytics.total} color="blue" />
				<StatsCard title="Applied" value={analytics.applied} color="indigo" />
				<StatsCard title="Interviews" value={analytics.interview} color="yellow" />
				<StatsCard title="Offers" value={analytics.offer} color="green" />
				<StatsCard title="Rejected" value={analytics.rejected} color="red" />
			</div>
		)
	);
};

export default Analytics;
