import clsx from 'clsx';
import React, { useMemo } from 'react';
import { AllowedAtomicProps, makeAllowedAtomicProps, presets } from '../../../lib/style-utils';
import { AtomicPropsTwo, atomicTwo } from '../../../styles/atomicTwo.css';
import { atomic } from '../../../styles/sprinkles.css';
import { useFilterProps } from '../../../styles/useFilterProps';
import * as style from './NestedDialogContainer.css';

const nestedDialogWrapperAllowedProps = makeAllowedAtomicProps([
	...presets.positionSelf,
	...presets.margins,
	...presets.paddings,
	...presets.positionSelf,
	...presets.size,
]);
type NestedDialogWrapperAllowedProps = AllowedAtomicProps<typeof nestedDialogWrapperAllowedProps>;
/**
 * Dialogs with container set as the container returned by the hook will be nested inside this component.
 */
type NestedDialogWrapper = React.FC<{ children: React.ReactNode } & NestedDialogWrapperAllowedProps & AtomicPropsTwo>;

/**
 * A hook that returns a wrapper component that should be used as a container for nested dialogs
 *
 * @returns NestedDialogWrapper - a wrapper component that should be used as a container for nested dialogs
 * @returns container - current ref to the wrapper component
 */
export const useNestedDialog = () => {
	const dialogRef = React.useRef<HTMLDivElement>(null);

	const NestedDialogWrapper: NestedDialogWrapper = useMemo(() => {
		// eslint-disable-next-line react/display-name
		return ({ children, ...props }) => {
			const { className: atomicClassName, otherProps, style: atomicStyle } = atomicTwo(props);
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { matching: atomicProps, nonMatching: nativeProps } = useFilterProps(
				otherProps,
				nestedDialogWrapperAllowedProps
			);

			return (
				<div
					className={clsx([style.wrapper, atomicClassName, atomic(atomicProps)])}
					style={atomicStyle}
					{...nativeProps}
					ref={dialogRef}
				>
					{children}
				</div>
			);
		};
	}, []);

	return { NestedDialogWrapper, container: dialogRef.current };
};
