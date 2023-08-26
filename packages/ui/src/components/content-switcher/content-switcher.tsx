import { polymorphicFactory } from '@polymorphic-factory/react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { LayoutGroup, motion } from 'framer-motion';
import React, { createContext, useContext, useId } from 'react';
import { cn } from '../../../lib/utils';

const ContentSwitcherContext = createContext<string | undefined>(undefined);

const useContextSwitcher = () => useContext(ContentSwitcherContext);

type CustomContentSwitcherProps = Omit<
	RadioGroup.RadioGroupProps,
	'asChild' | 'disabled' | 'dir' | 'orientation' | 'loop'
> & {
	value: string;
	isDisabled?: boolean;
};

export type ContentSwitcherContainerProps = CustomContentSwitcherProps;

export const Container: React.FC<ContentSwitcherContainerProps> = ({ isDisabled, children, className, ...props }) => {
	const id = useId();

	return (
		<LayoutGroup id={id}>
			<ContentSwitcherContext.Provider value={props.value}>
				<RadioGroup.Root
					disabled={isDisabled}
					orientation="horizontal"
					className={cn(
						'flex overflow-x-scroll rounded-full bg-interactive-element-neutral p-0.5 hide-scrollbars',
						className,
					)}
					{...props}
				>
					{children}
				</RadioGroup.Root>
			</ContentSwitcherContext.Provider>
		</LayoutGroup>
	);
};

type CustomContentSwitcherItemProps = Omit<RadioGroup.RadioGroupItemProps, 'asChild' | 'disabled'> & {
	isDisabled?: boolean;
};

export type ContentSwitcherItemProps = CustomContentSwitcherItemProps;

const Indicator = motion(RadioGroup.Indicator);

const itemPoly = polymorphicFactory<CustomContentSwitcherItemProps>({
	styled:
		component =>
		({ isDisabled, value, children, as, ...props }) => {
			const Tag = as || component;
			const activeItem = useContextSwitcher();
			const isActive = activeItem === value;

			return (
				<RadioGroup.Item
					className="relative flex-grow rounded-full px-4 py-1 text-center transition-all duration-200 ease-expo-out label-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive-solid-hover-primary/50"
					checked={isActive}
					disabled={isDisabled}
					value={value}
					asChild
					{...props}
				>
					<Tag>
						{isActive && (
							<Indicator
								transition={{ type: 'spring', stiffness: 400, damping: 45 }}
								aria-hidden
								layoutId="indicator"
								className="absolute inset-0 z-0 rounded-full bg-background-lowest"
							/>
						)}
						<div
							className={cn('relative z-10 truncate transition-colors duration-1000 ease-expo-out', {
								'text-copy-highcontrast-neutral': isActive,
								'text-copy-lowcontrast-neutral': !isActive,
							})}
						>
							{children}
						</div>
					</Tag>
				</RadioGroup.Item>
			);
		},
});

export const Item = itemPoly('button');
