import Modal from '../ui/Modal';
import ApplicationForm from './ApplicationForm';

const ApplicationModal = ({ mode, handleCreate, handleUpdate, mutating, application, onClose }) => {
	return (
		<Modal open={!!mode} onClose={onClose}>
			<ApplicationForm
				mode={mode}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				mutating={mutating}
				application={application}
				onClose={onClose}
			/>
		</Modal>
	);
};

export default ApplicationModal;
