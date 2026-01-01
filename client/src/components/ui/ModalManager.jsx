import ApplicationModal from "../applications/ApplicationModal";
import DeleteModal from "../applications/DeleteModal";

const ModalManager = ({ modal, handlers, mutating, onClose }) => {
	if (!modal) return null;

	const mode = modal === 'create' ? 'create' : modal.mode;

	switch (mode) {
		case 'delete':
			return (
				<DeleteModal
					handleDelete={handlers.handleDelete}
					mutating={mutating}
					id={modal.id}
					onClose={onClose}
				/>
			);

		case 'create':
		case 'edit':
			return (
				<ApplicationModal
					mode={mode}
					handleCreate={handlers.handleCreate}
					handleUpdate={handlers.handleUpdate}
					mutating={mutating}
					application={modal.app}
					onClose={onClose}
				/>
			);

		default:
			return null;
	}
};

export default ModalManager;