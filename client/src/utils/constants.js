export const STATUS_OPTIONS = [
	{ value: 'Applied', label: 'Applied', color: 'bg-blue-100 text-blue-800' },
	{ value: 'Interview', label: 'Interview', color: 'bg-yellow-100 text-yellow-800' },
	{ value: 'Offer', label: 'Offer', color: 'bg-green-100 text-green-800' },
	{ value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

export const getStatusColor = (status) => {
	const option = STATUS_OPTIONS.find((opt) => opt.value === status);
	return option?.color || 'bg-gray-100 text-gray-800';
};
