import { Loader2 } from 'lucide-react';
import StatsCard from './StatsCard';

const Analytics = ({ analytics, analyticsLoading }) => {
	if (!analytics) return null;

	if (analyticsLoading) {
		return (
			<div className="flex justify-center py-12">
				<Loader2 className="size-12 animate-spin text-blue-600" />
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
			<StatsCard title="Total Applications" value={analytics.total} color="blue" />
			<StatsCard title="Applied" value={analytics.applied} color="indigo" />
			<StatsCard title="Interviews" value={analytics.interview} color="yellow" />
			<StatsCard title="Offers" value={analytics.offer} color="green" />
			<StatsCard title="Rejected" value={analytics.rejected} color="red" />
		</div>
	);
};

export default Analytics;
