import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { LIMIT_OPTIONS } from '../../utils/constants';
import Dropdown, { DropdownItem } from '../ui/Dropdown';

const PaginationControls = ({ limit, setLimit, page, setPage, canGoNext, canGoPrev, totalPages }) => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-2">
				<p className="text-sm font-semibold">Rows per page</p>
				<Dropdown
					className="min-w-20! left-0! bottom-11! border border-primary/10 group"
					trigger={
						<div className="flex justify-center items-center border border-primary/10 rounded-lg p-2  hover:bg-gray-200 dark:hover:bg-[#1b2027]">
							<p className="text-sm">{limit}</p>
							<ChevronDown className="size-4" />
						</div>
					}
				>
					{LIMIT_OPTIONS.map((option) => {
						const isSelected = limit === option.value;

						return (
							<DropdownItem
								key={option.value}
								onClick={() => setLimit(option.value)}
								className={`transition-colors
                    ${isSelected ? 'bg-gray-200 dark:bg-[#1b2027] group-hover:bg-muted' : ''}`}
							>
								{option.label}
							</DropdownItem>
						);
					})}
				</Dropdown>
			</div>

			<div className="flex justify-center items-center gap-3">
				<div>
					<p>
						Page {page} of {totalPages}
					</p>
				</div>

				<div className="flex justify-center items-center gap-1">
					<button
						onClick={() => setPage(page - 1)}
						className="border border-primary/10 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1b2027] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-muted"
						disabled={!canGoPrev}
					>
						<ChevronLeft className="size-5" />
					</button>
					<button
						onClick={() => setPage(page + 1)}
						className="border border-primary/10 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-[#1b2027] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-muted"
						disabled={!canGoNext}
					>
						<ChevronRight className="size-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaginationControls;
