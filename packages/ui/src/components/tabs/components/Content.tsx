import * as T from '@radix-ui/react-tabs';
import React, { PropsWithChildren } from 'react';

type CustomTabContentProps = PropsWithChildren<{
	tabId: string;
}>;

export type TabsContentProps = CustomTabContentProps;

export const Content: React.FC<CustomTabContentProps> = ({ tabId, children }) => {
	return (
		<T.Content tabIndex={-1} value={tabId}>
			{children}
		</T.Content>
	);
};
