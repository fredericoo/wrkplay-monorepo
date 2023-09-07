import { useEffect, useState } from 'react';

export const useQuerySelector = (query: string, dependencies: any[]) => {
	const [element, setElement] = useState<HTMLElement | null>(null);
	useEffect(() => {
		const el = document.querySelector(query);
		if (el instanceof HTMLElement) setElement(el);
	}, [...dependencies]);

	return element;
};
