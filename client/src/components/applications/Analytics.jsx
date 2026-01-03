import { Loader2 } from 'lucide-react';
import StatsCard from './StatsCard';
import { STATUS_OPTIONS } from '../../utils/constants';

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
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
			{STATUS_OPTIONS.map((status) => (
				<StatsCard
					key={status.value}
					title={status.value === 'All' ? 'Total Applications' : status.label}
					value={status.value === 'All' ? analytics.total : analytics[status.value.toLowerCase()]}
					colors={status.colors}
				/>
			))}
		</div>
	);
};

export default Analytics;
