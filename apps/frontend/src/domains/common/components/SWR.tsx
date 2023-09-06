import type { ErrorBehaviour, SWR as SWRFn } from '../common.cache';
import { Deferred } from './Deferred';

export const SWR = <TError extends ErrorBehaviour, TData>({
	data,
	children,
	...props
}: {
	data: SWRFn<TData, TError>;
	loadingElement: React.ReactNode;
	errorElement: React.ReactNode;
	children: (resolved: Awaited<SWRFn<TData, TError>['cached' | 'fresh']>) => React.ReactNode;
}) => {
	return (
		<Deferred
			data={data.fresh}
			loadingElement={data.cached ? children(data.cached) : props.loadingElement}
			errorElement={data._onError === 'ignore' ? children(data.cached) : props.errorElement}
		>
			{children}
		</Deferred>
	);
};
