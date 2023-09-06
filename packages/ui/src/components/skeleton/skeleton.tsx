import { cn } from '../../../lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('animate-pulse rounded-4 bg-interactive-element-neutral', className)} {...props} />;
}

export { Skeleton };
