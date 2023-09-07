import * as D from '@radix-ui/react-dialog';
import { motion, MotionValue } from 'framer-motion';
import React from 'react';

type DialogOverlayProps = {
	opacity?: MotionValue;
};

export const DialogOverlay: React.FC<DialogOverlayProps> = ({ opacity }) => {
	return (
		<D.Overlay forceMount asChild>
			<motion.div
				style={{ opacity }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className={'absolute inset-0 bg-[#1315207F]'}
			/>
		</D.Overlay>
	);
};
