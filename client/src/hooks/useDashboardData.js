import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useDebounce from './useDebounce';
import { applicationsAPI } from '../services/applicationsAPI';
import { analyticsAPI } from '../services/analyticsAPI';

const useDashboardData = (initial = { page: 1, limit: 10 }) => {
	// raw data + flags
	const [applications, setApplications] = useState([]);
	const [analytics, setAnalytics] = useState(null);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	// loading states
	const [appsLoading, setAppsLoading] = useState(true);
	const [analyticsLoading, setAnalyticsLoading] = useState(true);
	const [mutating, setMutating] = useState(false);

	// error states
	const [appsError, setAppsError] = useState(null);
	const [analyticsError, setAnalyticsError] = useState(null);

	// ui state
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 400);
	const [statusFilter, setStatusFilter] = useState('All');
	const [page, setPage] = useState(initial.page);
	const [limit, setLimit] = useState(initial.limit);

	// modal state: null | 'create' | { mode: 'edit', application }
	const [modal, setModal] = useState(null);

	// fetch applications with server side paging
	const fetchApplications = useCallback(
		async (opts = {}) => {
			const { page: p = page, limit: l = limit, search, status } = opts;

			setAppsLoading(true);
			setAppsError(null);

			try {
				const params = { page: p, limit: l };

				if (search) params.search = search;
				if (status && status !== 'All') params.status = status;

				const { data } = await applicationsAPI.getAll(params);
				// expect data.applications array
				setApplications(data.items || []);
				setTotalCount(data.total || 0);
				setTotalPages(data.totalPages || 0);
			} catch (error) {
				console.error('Failed to load applications', error);
				setAppsError(error);
				toast.error('Failed to load applications');
			} finally {
				setAppsLoading(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	// fetch analytics
	const fetchAnalytics = useCallback(async () => {
		setAnalyticsLoading(true);
		setAnalyticsError(null);

		try {
			const { data } = await analyticsAPI.get();
			setAnalytics(data.analytics || null);
		} catch (error) {
			console.error('Failed to load analytics', error);
			setAnalyticsError(error);
		} finally {
			setAnalyticsLoading(false);
		}
	}, []);

	// fetch apps when page, limit, search, or filter changes
	useEffect(() => {
		fetchApplications({ page, limit, search: debouncedSearch, status: statusFilter });
	}, [fetchApplications, page, limit, debouncedSearch, statusFilter]);

	// fetch analytics on mount
	useEffect(() => {
		fetchAnalytics();
	}, [fetchAnalytics]);

	// refresh both apps and analytics
	const refreshAll = useCallback(async () => {
		await Promise.all([
			fetchApplications({ page, limit, search: debouncedSearch, status: statusFilter }),
			fetchAnalytics(),
		]);
	}, [fetchApplications, fetchAnalytics, page, limit, debouncedSearch, statusFilter]);

	const handleCreate = useCallback(
		async (payload) => {
			setMutating(true);
			try {
				await applicationsAPI.create(payload);
				toast.success('Application added succesfully!');
				setModal(null);
				await refreshAll();
			} catch (error) {
				toast.error(error.response?.data?.message || 'Failed to add application');
				throw error;
			} finally {
				setMutating(false);
			}
		},
		[refreshAll]
	);

	const handleUpdate = useCallback(
		async (id, payload) => {
			setMutating(true);
			try {
				await applicationsAPI.update(id, payload);
				toast.success('Application updated successfully');
				setModal(null);
				await refreshAll();
			} catch (error) {
				toast.error(error.response?.data?.message || 'Failed to update application');
				throw error;
			} finally {
				setMutating(false);
			}
		},
		[refreshAll]
	);

	const handleDelete = useCallback(
		async (id) => {
			setMutating(true);
			try {
				await applicationsAPI.delete(id);
				toast.success('Application deleted successfully');
        setModal(null);

				// if deleting last item on current page and not page 1, go back one page
				if (applications.length === 1 && page > 1) {
					setPage(page - 1);
				} else {
					await refreshAll();
				}
			} catch (error) {
				toast.error(error.response?.data?.message || 'Failed to delete application');
				throw error;
			} finally {
				setMutating(false);
			}
		},
		[refreshAll, applications.length, page]
	);

	const canGoNext = page < totalPages;
	const canGoPrev = page > 1;

	return {
		// data + flags
		applications,
		analytics,
		totalCount,

		// loading states
		appsLoading,
		analyticsLoading,
		mutating,

		// error states
		appsError,
		analyticsError,

		// UI state
		searchTerm,
		setSearchTerm,
		statusFilter,
		setStatusFilter,
		page,
		setPage,
		limit,
		setLimit,

		// modal
		modal,
		setModal,

		// actions
		fetchApplications,
		fetchAnalytics,
		refreshAll,
		handleCreate,
		handleUpdate,
		handleDelete,

		// pagination helpers
		totalPages,
		canGoNext,
		canGoPrev,
		debouncedSearch,
	};
};

export default useDashboardData;
