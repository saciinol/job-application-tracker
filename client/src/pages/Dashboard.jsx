import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import { applicationsAPI } from '../services/applicationsAPI';
import { analyticsAPI } from '../services/analyticsAPI';
import Layout from '../components/ui/Layout';
import Button from '../components/ui/Button';

const Dashboard = () => {
	const [applications, setApplications] = useState([]);
	const [analytics, setAnalytics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingApp, setEditingApp] = useState(null);
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

	return (
		<Layout>
			<div className="space-y-8">
				{/* header */}
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-primary">Dashboard</h1>
						<p className="text-primary/70 mt-1">Track and manage your job applications</p>
					</div>

					<Button onClick={() => setShowForm(true)} variant="blue" className="gap-2 rounded-lg!">
						<Plus className="size-5" />
						Add Application
					</Button>
				</div>

				{/* analytics stats */}
				<div>Analytics Stats</div>

				<div>Filters</div>

				<div>Applications List</div>

				<div>Pagination info</div>
			</div>

			{showForm && <div>Add Application Modal</div>}

			{editingApp && <div>Edit Application Modal</div>}
		</Layout>
	);
};

export default Dashboard;
