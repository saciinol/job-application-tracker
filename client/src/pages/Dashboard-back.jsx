import { useState, useEffect } from 'react';
import { applicationsAPI } from '../services/applicationsAPI';
import { analyticsAPI } from '../services/analyticsAPI';
import Layout from '../components/ui/Layout';
import ApplicationCard from '../components/applications/ApplicationCard';
import ApplicationForm from '../components/applications/ApplicationForm';
import StatsCard from '../components/applications/StatsCard';
import toast from 'react-hot-toast';
import { Plus, Filter, Search } from 'lucide-react';

export default function Dashboard() {
	const [applications, setApplications] = useState([]);
	const [analytics, setAnalytics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingApp, setEditingApp] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [page, setPage] = useState(1);

	useEffect(() => {
		fetchApplications();
		fetchAnalytics();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const fetchApplications = async () => {
		try {
			setLoading(true);
			const { data } = await applicationsAPI.getAll({ page, limit: 10 });
			setApplications(data.applications);
		} catch {
			toast.error('Failed to load applications');
		} finally {
			setLoading(false);
		}
	};

	const fetchAnalytics = async () => {
		try {
			const { data } = await analyticsAPI.get();
			setAnalytics(data.analytics);
		} catch {
			console.error('Failed to load analytics');
		}
	};

	const handleCreateApp = async (appData) => {
		try {
			await applicationsAPI.create(appData);
			toast.success('Application added successfully!');
			setShowForm(false);
			fetchApplications();
			fetchAnalytics();
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to add application');
		}
	};

	const handleUpdateApp = async (id, appData) => {
		try {
			await applicationsAPI.update(id, appData);
			toast.success('Application updated successfully!');
			setEditingApp(null);
			fetchApplications();
			fetchAnalytics();
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to update application');
		}
	};

	const handleDeleteApp = async (id) => {
		if (!confirm('Are you sure you want to delete this application?')) return;

		try {
			await applicationsAPI.delete(id);
			toast.success('Application deleted successfully!');
			fetchApplications();
			fetchAnalytics();
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to delete application');
		}
	};

	const filteredApplications = applications.filter((app) => {
		const matchesSearch =
			app.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			app.position.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<Layout>
			<div className="space-y-8">
				{/* Header */}
				<div className="flex justify-between items-start md:items-center">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h1>
						<p className="text-sm md:text-base text-primary/70 mt-1">Track and manage your job applications</p>
					</div>
					<button
						onClick={() => setShowForm(true)}
						className="flex items-center gap-2 bg-blue-600 text-white p-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
					>
						<Plus className="size-4 md:size-5" />
						<p className='hidden md:inline'>Add Application</p>
					</button>
				</div>

				{/* Analytics Stats */}
				{analytics && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
						<StatsCard title="Total Applications" value={analytics.total} color="blue" />
						<StatsCard title="Applied" value={analytics.applied} color="indigo" />
						<StatsCard title="Interviews" value={analytics.interview} color="yellow" />
						<StatsCard title="Offers" value={analytics.offer} color="green" />
						<StatsCard title="Rejected" value={analytics.rejected} color="red" />
					</div>
				)}

				{/* Filters */}
				<div className="bg-background p-6 rounded-xl shadow-sm">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 w-5 h-5" />
								<input
									type="text"
									placeholder="Search by company or position..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-primary placeholder:text-primary/40"
								/>
							</div>
						</div>

						{/* Status Filter */}
						<div className="md:w-48">
							<div className="relative">
								<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 w-5 h-5" />
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-primary/20 text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-background"
								>
									<option value="All">All Status</option>
									<option value="Applied">Applied</option>
									<option value="Interview">Interview</option>
									<option value="Offer">Offer</option>
									<option value="Rejected">Rejected</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Applications List */}
				<div className="space-y-4">
					{loading ? (
						<div className="flex justify-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
						</div>
					) : filteredApplications.length === 0 ? (
						<div className="bg-white rounded-xl shadow-sm border p-12 text-center">
							<div className="text-gray-400 mb-4">
								<Plus className="w-16 h-16 mx-auto" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
							<p className="text-gray-600 mb-6">
								{searchTerm || statusFilter !== 'All'
									? 'Try adjusting your filters'
									: 'Start tracking your job applications by adding your first one!'}
							</p>
							{!searchTerm && statusFilter === 'All' && (
								<button
									onClick={() => setShowForm(true)}
									className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
								>
									<Plus className="w-5 h-5" />
									Add Your First Application
								</button>
							)}
						</div>
					) : (
						filteredApplications.map((app) => (
							<ApplicationCard
								key={app.id}
								application={app}
								onEdit={() => setEditingApp(app)}
								onDelete={() => handleDeleteApp(app.id)}
							/>
						))
					)}
				</div>

				{/* Pagination Info */}
				{!loading && filteredApplications.length > 0 && (
					<div className="text-center text-primary/70">Showing {filteredApplications.length} application(s)</div>
				)}
			</div>

			{/* Add Application Modal */}
			{showForm && <ApplicationForm onSubmit={handleCreateApp} onClose={() => setShowForm(false)} />}

			{/* Edit Application Modal */}
			{editingApp && (
				<ApplicationForm
					application={editingApp}
					onSubmit={(data) => handleUpdateApp(editingApp.id, data)}
					onClose={() => setEditingApp(null)}
				/>
			)}
		</Layout>
	);
}
