import { Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { getStatusColor } from '../../utils/constants';

const Table = ({ children }) => {
	const columns = [
		'Company Name',
		'Position',
		'Status',
		'Location',
		'Salary Range',
		'Job URL',
		'Applied Date',
		'Deadline',
		'Notes',
		'Action',
	];

	return (
		<div className="border border-primary/10 rounded-lg">
			<div className="grid grid-cols-10 gap-4 border-b border-primary/10">
				{columns.map((col) => (
					<div key={col} className="line-clamp-1 p-3 font-semibold text-nowrap text-primary">
						{col}
					</div>
				))}
			</div>
			<div>{children}</div>
		</div>
	);
};

export const TableItem = ({ application, onEdit, onDelete }) => {
	const { company_name, position, status, location, salary_range, job_url, notes, applied_date, deadline } =
		application;

	const convertDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<div className="grid grid-cols-10 gap-4 border-b border-primary/10 text-primary">
			<div className="line-clamp-1 p-3 text-nowrap">{company_name}</div>
			<div className="line-clamp-1 p-3 text-nowrap">{position}</div>
			<div className="line-clamp-1 p-3 text-nowrap">
				<p className={`rounded-full text-center ${getStatusColor(status)}`}>{status}</p>
			</div>
			<div className="line-clamp-1 p-3 text-nowrap">{location}</div>
			<div className="line-clamp-1 p-3 text-nowrap">{salary_range}</div>
			<div className="line-clamp-1 p-3 text-nowrap">
				<a href={job_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
					View Job Posting
				</a>
			</div>
			<div className="line-clamp-1 p-3 text-nowrap">{convertDate(applied_date)}</div>
			<div className="line-clamp-1 p-3 text-nowrap">{convertDate(deadline)}</div>
			<div className="line-clamp-1 p-3 text-nowrap">{notes}</div>
			<div className="line-clamp-1 p-3 text-nowrap">
				<Button
					onClick={onEdit}
					className="text-primary/80 transition-colors rounded-full! hover:bg-primary/10"
					variant="icon"
				>
					<Edit className="size-4 transform translate-z-0 backface-hidden will-change-auto" />
				</Button>
				<Button
					onClick={onDelete}
					className="ml-1 text-red-600 transition-colors rounded-full! hover:bg-primary/10"
					variant="icon"
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default Table;
