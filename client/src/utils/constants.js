export const STATUS_OPTIONS = [
	{ value: 'All', label: 'Status', color: 'bg-blue-500 text-white' },
	{ value: 'Applied', label: 'Applied', color: 'bg-blue-500 text-white' },
	{ value: 'Interview', label: 'Interview', color: 'bg-yellow-500 text-white' },
	{ value: 'Offer', label: 'Offer', color: 'bg-green-500 text-white' },
	{ value: 'Rejected', label: 'Rejected', color: 'bg-red-500 text-white' },
];

export const getStatusColor = (status) => {
	const option = STATUS_OPTIONS.find((opt) => opt.value === status);
	return option?.color || 'bg-gray-100 text-gray-800';
};

export const LIMIT_OPTIONS = [
	{ value: 5, label: '5' },
	{ value: 10, label: '10' },
	{ value: 25, label: '25' },
	{ value: 50, label: '50' },
];
