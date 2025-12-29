import { useState } from 'react';
import { X } from 'lucide-react';
import { STATUS_OPTIONS } from '../../utils/constants';

const ApplicationForm = ({ application, onSubmit, onClose }) => {
	const isEditing = !!application;
  const applied_date = application?.applied_date && new Date(application.applied_date).toISOString().split('T')[0];
  const deadline = application?.deadline && new Date(application.deadline).toISOString().split('T')[0];

	const [formData, setFormData] = useState({
		company_name: application?.company_name || '',
		position: application?.position || '',
		status: application?.status || 'Applied',
		location: application?.location || '',
		salary_range: application?.salary_range || '',
		job_url: application?.job_url || '',
		notes: application?.notes || '',
		applied_date: applied_date || new Date().toISOString().split('T')[0],
		deadline: deadline || '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Remove empty optional fields
			const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
				if (value !== '') {
					acc[key] = value;
				}
				return acc;
			}, {});

			await onSubmit(cleanedData);
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl">
					<h2 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Application' : 'Add New Application'}</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Company Name - Required */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Company Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="company_name"
							value={formData.company_name}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							placeholder="e.g., Google, Microsoft"
							required
						/>
					</div>

					{/* Position - Required */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Position <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="position"
							value={formData.position}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							placeholder="e.g., Software Engineer, Product Manager"
							required
						/>
					</div>

					{/* Status and Applied Date Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Status */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Status <span className="text-red-500">*</span>
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
								required
							>
								{STATUS_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Applied Date */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Applied Date <span className="text-red-500">*</span>
							</label>
							<input
								type="date"
								name="applied_date"
								value={formData.applied_date}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								required
							/>
						</div>
					</div>

					{/* Location and Salary Range Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Location */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
							<input
								type="text"
								name="location"
								value={formData.location}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								placeholder="e.g., San Francisco, CA"
							/>
						</div>

						{/* Salary Range */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
							<input
								type="text"
								name="salary_range"
								value={formData.salary_range}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								placeholder="e.g., $80k - $120k"
							/>
						</div>
					</div>

					{/* Job URL and Deadline Row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Job URL */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Job URL</label>
							<input
								type="url"
								name="job_url"
								value={formData.job_url}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
								placeholder="https://..."
							/>
						</div>

						{/* Deadline */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
							<input
								type="date"
								name="deadline"
								value={formData.deadline}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
							/>
						</div>
					</div>

					{/* Notes */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
						<textarea
							name="notes"
							value={formData.notes}
							onChange={handleChange}
							rows={4}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
							placeholder="Add any additional notes about this application..."
						/>
					</div>

					{/* Form Actions */}
					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
						>
							{loading ? 'Saving...' : isEditing ? 'Update Application' : 'Add Application'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ApplicationForm;
