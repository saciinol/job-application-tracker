import { Loader2, Briefcase } from 'lucide-react';
import Table, { TableItem } from './Table';

const ApplicationsTable = ({ applications, appsLoading, searchTerm, statusFilter, onEdit, onDelete }) => {
	if (appsLoading) {
		return (
			<div className="flex justify-center py-12 border border-primary/10 rounded-lg">
				<Loader2 className="size-12 animate-spin text-blue-600" />
			</div>
		);
	}

	if (applications.length === 0) {
		return (
			<div className="bg-muted rounded-xl shadow-sm border border-primary/10 p-12 text-center">
				<div className="text-primary mb-4">
					<Briefcase className="size-16 mx-auto" />
				</div>
				<h3 className="text-xl font-semibold text-primary mb-2">No applications found</h3>
				<p className="text-primary/70">
					{searchTerm || statusFilter !== 'All'
						? 'Try adjusting your filters'
						: 'Start tracking your job applications by adding your first one!'}
				</p>
			</div>
		);
	}

	return (
		<Table>
			{applications.map((app) => (
				<TableItem
					key={app.id}
					application={app}
					onEdit={() => onEdit(app)}
					onDelete={() => onDelete(app.id)}
				/>
			))}
		</Table>
	);
};

export default ApplicationsTable;