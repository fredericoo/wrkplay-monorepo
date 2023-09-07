import * as D from '@radix-ui/react-dialog';
import React from 'react';

export type DialogCloseButtonProps = Record<string, never>;

export const DialogCloseButton: React.FC<DialogCloseButtonProps> = props => {
	return <D.Close>close</D.Close>;
};
