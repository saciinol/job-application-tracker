const StatsCard = ({ title, value, colors }) => {
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
