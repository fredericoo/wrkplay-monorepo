import * as D from '@radix-ui/react-dialog';
import React from 'react';

export type DialogTriggerProps = D.DialogTriggerProps;
export const DialogTrigger: React.FC<D.DialogTriggerProps> = props => <D.Trigger asChild {...props} />;
