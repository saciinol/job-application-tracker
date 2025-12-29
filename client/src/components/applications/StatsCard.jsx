const StatsCard = ({ title, value, color = 'blue' }) => {
	const colorClasses = {
		blue: {
			bg: 'bg-blue-50',
			text: 'text-blue-600',
			border: 'border-blue-200',
		},
		indigo: {
			bg: 'bg-indigo-50',
			text: 'text-indigo-600',
			border: 'border-indigo-200',
		},
		yellow: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-600',
			border: 'border-yellow-200',
		},
		green: {
			bg: 'bg-green-50',
			text: 'text-green-600',
			border: 'border-green-200',
		},
		red: {
			bg: 'bg-red-50',
			text: 'text-red-600',
			border: 'border-red-200',
		},
	};

	const colors = colorClasses[color] || colorClasses.blue;

	return (
		<div className={`${colors.bg} border ${colors.border} rounded-xl p-6 transition-transform hover:scale-105`}>
			<div className="flex flex-col">
				<span className="text-sm font-medium text-gray-600 mb-2">{title}</span>
				<span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
			</div>
		</div>
	);
};

export default StatsCard;
