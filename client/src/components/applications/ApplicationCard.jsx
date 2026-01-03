import { format } from 'date-fns';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Edit, Trash2, FileText } from 'lucide-react';
import { getStatusColor } from '../../utils/constants';

const ApplicationCard = ({ application, onEdit, onDelete }) => {
	const { company_name, position, status, location, salary_range, job_url, notes, applied_date, deadline } =
		application;

	const formatDate = (date) => {
		if (!date) return null;
		try {
			return format(new Date(date), 'MMM dd, yyyy');
		} catch {
			return null;
		}
	};

	return (
		<div className="bg-background rounded-xl shadow-sm border border-primary/10 p-6 hover:shadow-md transition-shadow">
			{/* Header */}
			<div className="flex justify-between items-start mb-4">
				<div className="flex-1">
					<div className="flex items-start gap-3">
						<div className="bg-blue-50 dark:bg-blue-600 p-2 rounded-lg">
							<Building2 className="size-5 text-blue-600 dark:text-blue-50" />
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-primary/90">{company_name}</h3>
							<p className="text-primary/70 mt-1">{position}</p>
						</div>
					</div>
				</div>

				{/* Status Badge */}
				<span className={`inline-flex justify-center px-2 py-1 w-18 rounded-lg text-sm font-medium ${getStatusColor(status)}`}>{status}</span>
			</div>

			{/* Details Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
				{/* Applied Date */}
				<div className="flex items-center gap-2 text-sm text-primary/80">
					<Calendar className="size-4 text-gray-400" />
					<span>Applied: {formatDate(applied_date)}</span>
				</div>

				{/* Deadline */}
				{deadline && (
					<div className="flex items-center gap-2 text-sm text-primary/80">
						<Calendar className="size-4 text-red-400" />
						<span>Deadline: {formatDate(deadline)}</span>
					</div>
				)}

				{/* Location */}
				{location && (
					<div className="flex items-center gap-2 text-sm text-primary/80">
						<MapPin className="size-4 text-gray-400" />
						<span>{location}</span>
					</div>
				)}

				{/* Salary Range */}
				{salary_range && (
					<div className="flex items-center gap-2 text-sm text-primary/80">
						<DollarSign className="size-4 text-gray-400" />
						<span>{salary_range}</span>
					</div>
				)}
			</div>

			{/* Notes */}
			{notes && (
				<div className="mb-4 p-3 bg-muted/50 rounded-lg">
					<div className="flex items-start gap-2">
						<FileText className="size-4 text-gray-400 mt-0.5 shrink-0" />
						<p className="text-sm text-primary/90 line-clamp-2">{notes}</p>
					</div>
				</div>
			)}

			{/* Footer Actions */}
			<div className="flex items-center justify-between pt-4 border-t">
				{/* Job URL */}
				{job_url ? (
					<a
						href={job_url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
					>
						<ExternalLink className="size-4" />
						View Job Posting
					</a>
				) : (
					<div></div>
				)}

				{/* Action Buttons */}
				<div className="flex items-center gap-2">
					<button
						onClick={onEdit}
						className="flex items-center gap-2 px-3 py-2 text-sm text-primary/90 hover:bg-primary/5 rounded-lg transition"
					>
						<Edit className="size-4" />
						Edit
					</button>
					<button
						onClick={onDelete}
						className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-950 rounded-lg transition"
					>
						<Trash2 className="size-4" />
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ApplicationCard;