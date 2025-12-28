import { useEffect, useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';

import { applicationsAPI } from '../services/applicationsAPI';
import { analyticsAPI } from '../services/analyticsAPI';
import Layout from '../components/ui/Layout';
import Button from '../components/ui/Button';
import Table, { TableItem } from '../components/applications/Table';

const Dashboard = () => {
	const [applications, setApplications] = useState([]);
	const [analytics, setAnalytics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingApp, setEditingApp] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				setLoading(true);
				const { data } = await applicationsAPI.getAll({ page, limit: 10 });
				setApplications(data.applications);
			} catch (error) {
				console.error('Failed to load applications', error);
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, [page]);

	useEffect(() => {
		const fetchAnalytics = async () => {
			try {
				const { data } = await analyticsAPI.get();
				setAnalytics(data.analytics);
			} catch (error) {
				console.error('Failed to load analytics', error);
			}
		};

		fetchAnalytics();
	}, []);

	const filteredApplications = applications.filter((app) => {
		const matchesSearch =
			app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.position.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<Layout>
			<div className="space-y-4">
				{/* <div>Analytics Stats</div>*/}

				<div className="flex justify-between items-center">
					<div className="flex justify-center items-center gap-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 size-5" />
							<input
								type="text"
								placeholder="Search by company or position..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-80 pl-10 pr-4 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-primary placeholder:text-primary/40"
							/>
						</div>

						<div className="md:w-32">
							<div className="relative">
								<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 w-5 h-5" />
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-primary/10 text-primary rounded-lg outline-none appearance-none cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1b2027]"
								>
									<option value="All">Status</option>
									<option value="Applied">Applied</option>
									<option value="Interview">Interview</option>
									<option value="Offer">Offer</option>
									<option value="Rejected">Rejected</option>
								</select>
							</div>
						</div>
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
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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

				{/* <div>Pagination info</div> */}
			</div>

			{showForm && <div>Add Application Modal</div>}

			{editingApp && <div>Edit Application Modal</div>}
		</Layout>
	);
};

export default Dashboard;
