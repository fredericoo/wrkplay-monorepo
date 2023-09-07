import clsx from 'clsx';
import React from 'react';
import { IconComponent } from '../../../../icons/utils';
import { PolymorphicComponent } from '../../../lib/polymorphic';
import { VariantsOf } from '../../../lib/type-utils';
import * as style from './ActionSheet.css';

type ActionSheetItemProps = {
	label: string;
	iconStart?: IconComponent;
	iconEnd?: IconComponent;
	className?: never;
	style?: never;
	colorScheme?: VariantsOf<typeof style.itemVariant>['colorScheme'];
};

export const Item: PolymorphicComponent<'button', ActionSheetItemProps> = ({
	as: Tag = 'button',
	label,
	iconStart: IconStart,
	iconEnd: IconEnd,
	className,
	style: nativeStyle,
	colorScheme,
	...props
}) => {
	return (
		<Tag className={clsx(style.itemVariant({ colorScheme }), className)} style={nativeStyle} {...props}>
			{IconStart && (
				<div className={style.itemIcon}>
					<IconStart size="lg" />
				</div>
			)}
			<span className={style.itemLabel}>{label}</span>
			{IconEnd && (
				<div className={style.itemIcon}>
					<IconEnd size="lg" />
				</div>
			)}
		</Tag>
	);
};
