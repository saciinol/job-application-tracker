import Layout from '../components/ui/Layout';
import Analytics from '../components/applications/Analytics';
import FiltersBar from '../components/applications/FiltersBar';
import Applications from '../components/applications/Applications';
import PaginationControls from '../components/applications/PaginationControls';
import useDashboardData from '../hooks/useDashboardData';
import { useCallback } from 'react';
import ModalManager from '../components/ui/ModalManager';

const Dashboard = () => {
	const {
		applications,
		analytics,
    totalCount,

		appsLoading,
		analyticsLoading,
		mutating,

		searchTerm,
		setSearchTerm,
		statusFilter,
		setStatusFilter,
		page,
		setPage,
		limit,
		setLimit,

		modal,
		setModal,

		handleCreate,
		handleUpdate,
		handleDelete,

		totalPages,
		canGoNext,
		canGoPrev,
	} = useDashboardData();

	const openCreate = useCallback(() => setModal('create'), [setModal]);
	const openEdit = useCallback((app) => setModal({ mode: 'edit', app }), [setModal]);
	const openDelete = useCallback((id) => setModal({ mode: 'delete', id }), [setModal]);

	return (
		<Layout>
			<div className="space-y-4">
				<Analytics analytics={analytics} analyticsLoading={analyticsLoading} />

				<FiltersBar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					onAdd={openCreate}
				/>

				<Applications
					applications={applications}
					appsLoading={appsLoading}
					searchTerm={searchTerm}
					statusFilter={statusFilter}
					onEdit={openEdit}
					onDelete={openDelete}
				/>

				<PaginationControls
					limit={limit}
					setLimit={setLimit}
					page={page}
					setPage={setPage}
					canGoNext={canGoNext}
					canGoPrev={canGoPrev}
					totalPages={totalPages}
          totalCount={totalCount}
				/>
			</div>

			<ModalManager
				modal={modal}
				handlers={{ handleCreate, handleUpdate, handleDelete }}
				mutating={mutating}
				onClose={() => setModal(null)}
			/>
		</Layout>
	);
};

export default Dashboard;
