import { Loader2 } from 'lucide-react';

export const PageLoader = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4 bg-muted">
			<Loader2 className="size-12 animate-spin text-blue-600" />
			<p className="text-primary/50 dark:text-gray-200 text-lg">Loading...</p>
		</div>
	);
};
