import { useMotionValue } from 'framer-motion';

export const useDragThreshold = (onDrag: React.PointerEventHandler<HTMLDivElement>, threshold: number) => {
	const startCoordinate = useMotionValue(undefined as { x: number; y: number } | undefined);

	const onPointerDown: React.PointerEventHandler<HTMLDivElement> = e => {
		startCoordinate.set({ x: e.clientX, y: e.clientY });
	};

	const onPointerMove: React.PointerEventHandler<HTMLDivElement> = e => {
		const start = startCoordinate.get();
		if (start === undefined) return;

		if (Math.abs(e.clientX - start.x) > threshold) {
			startCoordinate.set(undefined);
			return;
		}

		if (Math.abs(e.clientY - start.y) > threshold) {
			onDrag(e);
			startCoordinate.set(undefined);
		}
	};

	const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
		startCoordinate.set(undefined);
	};

	return {
		onPointerDown,
		onPointerMove,
		onPointerUp,
	};
};
