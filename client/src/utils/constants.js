export const STATUS_OPTIONS = [
	{
		value: 'All',
		label: 'Status',
		color: 'bg-gray-500 text-white',
		colors: {
			bg: 'bg-gray-50',
			text: 'text-gray-600',
			border: 'border-gray-200',
		},
	},
	{
		value: 'Applied',
		label: 'Applied',
		color: 'bg-blue-500 text-white',
		colors: {
			bg: 'bg-blue-50',
			text: 'text-blue-600',
			border: 'border-blue-200',
		},
	},
	{
		value: 'Interview',
		label: 'Interview',
		color: 'bg-yellow-500 text-white',
		colors: {
			bg: 'bg-yellow-50',
			text: 'text-yellow-600',
			border: 'border-yellow-200',
		},
	},
	{
		value: 'Offer',
		label: 'Offer',
		color: 'bg-green-500 text-white',
		colors: {
			bg: 'bg-green-50',
			text: 'text-green-600',
			border: 'border-green-200',
		},
	},
	{
		value: 'Rejected',
		label: 'Rejected',
		color: 'bg-red-500 text-white',
		colors: {
			bg: 'bg-red-50',
			text: 'text-red-600',
			border: 'border-red-200',
		},
	},
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
