import { Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const DeleteModal = ({ handleDelete, mutating, id, onClose }) => {
	return (
		<Modal open onClose={onClose}>
			<div className="flex flex-col justify-center items-center gap-10 p-4">
				<p className="text-xl">Are you sure you want to delete this application?</p>

				<div className="space-x-4">
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={() => handleDelete(id)} variant="red">
						{mutating ? (
							<>
								<Loader2 className="size-4 animate-spin mr-2" />
								Delete
							</>
						) : (
							'Delete'
						)}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteModal;
