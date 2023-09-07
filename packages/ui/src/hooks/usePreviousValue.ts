import { useEffect, useRef } from 'react';

export const usePreviousValue = <T>(value: T) => {
	const previousValueRef = useRef<T>();

	useEffect(() => {
		previousValueRef.current = value;
	}, [value]);

	return previousValueRef.current;
};
