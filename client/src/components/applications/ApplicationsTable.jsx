import { Loader2, Plus } from 'lucide-react';
import Table, { TableItem } from './Table';

const ApplicationsTable = ({ applications, appsLoading, searchTerm, statusFilter, onEdit, onDelete }) => {
	return (
		<Table>
			{appsLoading ? (
				<div className="flex justify-center py-12">
					<Loader2 className="size-12 animate-spin text-blue-600" />
				</div>
			) : applications.length === 0 ? (
				<div className="bg-muted rounded-xl shadow-sm p-12 text-center">
					<div className="text-gray-400 mb-4">
						<Plus className="w-16 h-16 mx-auto" />
					</div>
					<h3 className="text-xl font-semibold text-primary mb-2">No applications found</h3>
					<p className="text-primary/70 mb-6">
						{searchTerm || statusFilter !== 'All'
							? 'Try adjusting your filters'
							: 'Start tracking your job applications by adding your first one!'}
					</p>
				</div>
			) : (
				applications.map((app) => (
					<TableItem key={app.id} application={app} onEdit={() => onEdit(app)} onDelete={() => onDelete(app.id)} />
				))
			)}
		</Table>
	);
};

export default ApplicationsTable;
