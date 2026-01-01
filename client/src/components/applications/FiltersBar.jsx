import { Filter, Plus, Search, X } from 'lucide-react';
import { STATUS_OPTIONS } from '../../utils/constants';
import Dropdown, { DropdownItem } from '../ui/Dropdown';
import Button from '../ui/Button';

const FiltersBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAdd }) => {
	return (
		<div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center">
			<div className="flex flex-col md:flex-row justify-center items-center gap-3">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 size-5" />
					<input
						type="text"
						placeholder="Search by company or position..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full md:w-80 pl-10 pr-4 py-2 border border-primary/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-primary placeholder:text-primary/40"
					/>
					{searchTerm && (
						<div
							onClick={() => setSearchTerm('')}
							className="p-2 absolute top-1/2 right-1 transform -translate-y-1/2 cursor-pointer rounded-full transition-colors hover:bg-primary/10"
						>
							<X className="text-primary/60 size-4" />
						</div>
					)}
				</div>

				<Dropdown
					className="w-full! left-0! border border-primary/10 group"
					trigger={
						<div className="relative flex justify-center items-center border border-primary/10 rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-[#1b2027]">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/30 w-5 h-5" />
							<p className="pl-8 pr-2">{statusFilter === 'All' ? 'Status' : statusFilter}</p>
						</div>
					}
				>
					{STATUS_OPTIONS.map((status) => {
						const isSelected = statusFilter === status.value;

						return (
							<DropdownItem
								key={status.value}
								onClick={() => setStatusFilter(status.value)}
								className={`transition-colors
                    ${isSelected ? 'bg-gray-200 dark:bg-[#1b2027] group-hover:bg-muted' : ''}`}
							>
								{status.label}
							</DropdownItem>
						);
					})}
				</Dropdown>
			</div>

			<Button
				onClick={onAdd}
				variant="transparent"
				className="border-primary/10 font-normal hover:bg-gray-200! dark:hover:bg-[#1b2027]! hover:text-primary px-3!"
			>
				<Plus className="size-4 mr-2 text-primary/60" />
				<p>Add Application</p>
			</Button>
		</div>
	);
};

export default FiltersBar;
