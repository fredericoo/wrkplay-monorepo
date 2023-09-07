import React from 'react';

export const useDimensions = <T extends HTMLElement>() => {
	const ref = React.useRef<T>(null);

	const dimensions = React.useMemo(
		() =>
			new Proxy({} as DOMRect, {
				get(_, prop) {
					return ref.current?.getBoundingClientRect()[prop as keyof DOMRect] || 0;
				},
			}),
		[ref]
	);

	return { ref, dimensions };
};
