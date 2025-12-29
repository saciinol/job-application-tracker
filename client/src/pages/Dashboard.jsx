import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Loader2, Plus, Search, X } from 'lucide-react';

import { applicationsAPI } from '../services/applicationsAPI';
import Layout from '../components/ui/Layout';
import Button from '../components/ui/Button';
import Table, { TableItem } from '../components/applications/Table';
import Dropdown, { DropdownItem } from '../components/ui/Dropdown';
import { LIMIT_OPTIONS, STATUS_OPTIONS } from '../utils/constants';
import Analytics from '../components/applications/Analytics';

const Dashboard = () => {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingApp, setEditingApp] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [hasNextPage, setHasNextPage] = useState(true);

	useEffect(() => {
		fetchApplications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit]);

	const fetchApplications = async () => {
		try {
			setLoading(true);
			const { data } = await applicationsAPI.getAll({ page, limit });
			setApplications(data.applications);
			setHasNextPage(data.hasNextPage);
		} catch (error) {
			console.error('Failed to load applications', error);
		} finally {
			setLoading(false);
		}
	};

	const filteredApplications = useMemo(() => {
		return applications.filter((app) => {
			const matchesSearch =
				app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				app.position.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [applications, searchTerm, statusFilter]);

	// if (filteredApplications.length < limit) setDisable(true);

	return (
		<Layout>
			<div className="space-y-4">
				<Analytics />

				<div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center">
					<div className="flex flex-col md:flex-row justify-center items-center gap-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 size-5" />
							<input
								type="text"
								placeholder="Search by company or position..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full md:w-80 pl-10 pr-4 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-primary placeholder:text-primary/40"
							/>
							{searchTerm && (
								<div
									onClick={() => setSearchTerm('')}
									className="p-2 absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer rounded-full transition-colors hover:bg-primary/10"
								>
									<X className="text-primary/60 size-4" />
								</div>
							)}
						</div>

						<Dropdown
							className="w-full! left-0! border border-primary/10 group"
							trigger={
								<div className="relative flex justify-center items-center border border-primary/10 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-[#1b2027]">
									<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 w-5 h-5" />
									<p className="pl-8 pr-2">{statusFilter === 'All' ? 'Status' : statusFilter}</p>
								</div>
							}
						>
							{STATUS_OPTIONS.map((status) => {
								const isSelected = statusFilter === status.value;

								return (
									<DropdownItem
										key={status.value}
										onClick={() => setStatusFilter(status.value)}
										className={`transition-colors
                    ${isSelected ? 'bg-gray-200 dark:bg-[#1b2027] group-hover:bg-muted' : ''}`}
									>
										{status.label}
									</DropdownItem>
								);
							})}
						</Dropdown>
					</div>

					<Button
						onClick={() => setShowForm(true)}
						variant="transparent"
						className="border-primary/10 font-normal hover:bg-gray-200! dark:hover:bg-[#1b2027]! hover:text-primary px-3!"
					>
						<Plus className="size-4 mr-2 text-primary/60" />
						<p>Add Application</p>
					</Button>
				</div>

				<Table>
					{loading ? (
						<div className="flex justify-center py-12">
							<Loader2 className="size-12 animate-spin text-blue-600" />
						</div>
					) : filteredApplications.length === 0 ? (
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
						filteredApplications.map((app) => <TableItem application={app} key={app.id} />)
					)}
				</Table>

				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<p className="text-sm font-semibold">Rows per page</p>
						<Dropdown
							className="min-w-20! left-0! bottom-11! border border-primary/10 group"
							trigger={
								<div className="flex justify-center items-center border border-primary/10 rounded-lg p-2  hover:bg-gray-200 dark:hover:bg-[#1b2027]">
									<p className="text-sm">{limit}</p>
									<ChevronDown className="size-4" />
								</div>
							}
						>
							{LIMIT_OPTIONS.map((option) => {
								const isSelected = limit === option.value;

								return (
									<DropdownItem
										key={option.value}
										onClick={() => setLimit(option.value)}
										className={`transition-colors
                    ${isSelected ? 'bg-gray-200 dark:bg-[#1b2027] group-hover:bg-muted' : ''}`}
									>
										{option.label}
									</DropdownItem>
								);
							})}
						</Dropdown>
					</div>

					<div className="flex justify-center items-center gap-3">
						<div>
							<p>Page {page}</p>
						</div>

						<div className="flex justify-center items-center gap-1">
							<button
								onClick={() => setPage(page - 1)}
								className="border border-primary/10 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1b2027] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-muted"
								disabled={page === 1}
							>
								<ChevronLeft className="size-5" />
							</button>
							<button
								onClick={() => setPage(page + 1)}
								className="border border-primary/10 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1b2027] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-muted"
								disabled={hasNextPage}
							>
								<ChevronRight className="size-5" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{showForm && <div>Add Application Modal</div>}

			{editingApp && <div>Edit Application Modal</div>}
		</Layout>
	);
};

export default Dashboard;
