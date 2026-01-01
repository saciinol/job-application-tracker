import { ChevronDown, Filter, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Label from '../ui/Label';
import Button from '../ui/Button';
import { STATUS_OPTIONS } from '../../utils/constants';
import toast from 'react-hot-toast';

const formatDate = (value) => {
	if (!value) return '';
	try {
		return new Date(value).toISOString().split('T')[0];
	} catch {
		return '';
	}
};

const getEmptyForm = () => ({
	company_name: '',
	position: '',
	status: 'Applied',
	location: '',
	salary_range: '',
	job_url: '',
	notes: '',
	applied_date: new Date().toISOString().split('T')[0],
	deadline: '',
});

const ApplicationForm = ({ mode, handleCreate, handleUpdate, mutating, application, onClose }) => {
	const [formData, setFormData] = useState(getEmptyForm);

	useEffect(() => {
		if (!application) {
			setFormData(getEmptyForm());
			return;
		}

		setFormData({
			company_name: application.company_name ?? '',
			position: application.position ?? '',
			status: application.status ?? 'Applied',
			location: application.location ?? '',
			salary_range: application.salary_range ?? '',
			job_url: application.job_url ?? '',
			notes: application.notes ?? '',
			applied_date: formatDate(application.applied_date) || new Date().toISOString().split('T')[0],
			deadline: formatDate(application.deadline),
		});
	}, [application]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const REQUIRED_FIELDS = ['company_name', 'position', 'status', 'applied_date'];

	const handleSubmit = (e) => {
		e.preventDefault();

		if (mode === 'edit') {
			const changes = Object.keys(formData).reduce((acc, key) => {
				let newValue = formData[key] ?? '';
				let oldValue = application[key] ?? '';

				if (key === 'applied_date' || key === 'deadline') {
					newValue = formatDate(newValue);
					oldValue = formatDate(oldValue);
				}

				if (newValue !== oldValue) {
					acc[key] = newValue;
				}
				return acc;
			}, {});

			if (Object.keys(changes).length === 0) {
				return;
			}

			handleUpdate(application.id, changes);
		} else {
			const payload = Object.keys(formData).reduce((acc, key) => {
				const value = formData[key] ?? '';

				if (REQUIRED_FIELDS.includes(key)) {
					if (!value) return acc;
					acc[key] = value;
					return acc;
				}

				if (value !== '' && value !== null) {
					acc[key] = value;
				}

				return acc;
			}, {});

			const missing = REQUIRED_FIELDS.filter((k) => !payload[k]);
			if (missing.length > 0) {
				toast.error(`Missing required fields: ${missing.join(', ')} `);
				return;
			}

			handleCreate(payload);
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<h2 className="text-2xl font-bold text-primary">
					{mode === 'edit' ? 'Edit Job Application' : 'Add Job Application'}
				</h2>
			</div>

			<form onSubmit={handleSubmit} id="application-form" className="flex flex-col space-y-4">
				<div className="flex gap-4">
					<div className="relative flex-1">
						<Input
							id="company_name"
							type="text"
							name="company_name"
							value={formData.company_name}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							required
						/>

						<Label htmlFor="company_name">
							Company Name <span className="text-red-600">*</span>
						</Label>
					</div>

					<div className="relative flex-1">
						<Input
							id="position"
							type="text"
							name="position"
							value={formData.position}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							required
						/>

						<Label htmlFor="position">
							Position <span className="text-red-600">*</span>
						</Label>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="relative flex-1">
						<ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none size-5 text-primary/30" />
						<select
							id="status"
							name="status"
							value={formData.status}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							required
							className="flex w-full border-primary/20 text-primary bg-transparent px-3 pt-4 pb-2 text-base disabled:cursor-not-allowed disabled:opacity-50 peer focus:border-blue-600 rounded-md border focus:outline-none appearance-none"
						>
							{STATUS_OPTIONS.filter((s) => s.value !== 'All').map((status) => (
								<option key={status.value} value={status.value}>
									{status.label}
								</option>
							))}
						</select>
						<Label htmlFor="status">
							Status <span className="text-red-600">*</span>
						</Label>
					</div>

					<div className="relative flex-1">
						<Input
							id="applied_date"
							type="date"
							name="applied_date"
							value={formData.applied_date}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							required
							className="block!"
						/>

						<Label htmlFor="applied_date">
							Applied Date <span className="text-red-600">*</span>
						</Label>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="relative flex-1">
						<Input
							id="location"
							type="text"
							name="location"
							value={formData.location}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
						/>

						<Label htmlFor="location">Location</Label>
					</div>

					<div className="relative flex-1">
						<Input
							id="salary_range"
							type="text"
							name="salary_range"
							value={formData.salary_range}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
						/>

						<Label htmlFor="salary_range">Salary Range</Label>
					</div>
				</div>

				<div className="flex gap-4">
					<div className="relative flex-1">
						<Input
							id="job_url"
							type="text"
							name="job_url"
							value={formData.job_url}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
						/>

						<Label htmlFor="job_url">Job URL</Label>
					</div>

					<div className="relative flex-1">
						<Input
							id="deadline"
							type="date"
							name="deadline"
							value={formData.deadline}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							className="block!"
						/>

						<Label htmlFor="deadline">Deadline</Label>
					</div>
				</div>

				<div className="flex">
					<div className="relative flex-1">
						<textarea
							id="notes"
							type="text"
							name="notes"
							value={formData.notes}
							onChange={handleChange}
							placeholder=""
							disabled={mutating}
							className="flex w-full border-primary/20 text-primary bg-transparent px-3 pt-4 pb-2 text-base disabled:cursor-not-allowed disabled:opacity-50 peer focus:border-blue-600 rounded-md border focus:outline-none resize-none"
						/>

						<Label htmlFor="notes">Notes</Label>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<Button type="button" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" form="application-form" variant="blue" className={`${mutating ? 'px-4!' : 'px-6!'}`}>
						{mutating ? (
							<>
								<Loader2 className="size-4 animate-spin mr-2" />
								Save
							</>
						) : (
							'Save'
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ApplicationForm;
