import { Button } from '@wrkplay/ui';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link, useAsyncError, useLocation, useNavigation, useRouteError } from 'react-router-dom';

import { MessageView } from '~/domains/common/components/message-view';

import { getErrorPayload } from '../error.utils';

type ErrorViewProps = {
	heading?: string;
	message?: string;
};

export const ErrorView: React.FC<ErrorViewProps> = ({ heading = 'Error!', message }) => {
	const { pathname, search } = useLocation();
	const { state } = useNavigation();
	const routeError = useRouteError();
	const asyncError = useAsyncError();
	const error = routeError || asyncError;

	return (
		<div role="alert" className="flex h-full flex-col justify-center">
			<div className="pb-32 pt-4">
				<AnimatePresence mode="popLayout">
					{state === 'idle' && (
						<motion.div
							key={Math.random()}
							initial={{ scale: 0.75, opacity: 0 }}
							animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }}
							exit={{ scale: 0.75, opacity: 0 }}
							transition={{
								scale: { type: 'spring', bounce: 0.5, duration: 0.6 },
								opacity: { type: 'tween', ease: 'easeOut', duration: 0.3 },
							}}
						>
							<MessageView
								heading={heading}
								message={message ?? 'Something went wrong.'}
								headingLevel="h2"
								illustration={{
									type: 'image',
									src: '/img/line-broken.png',
									aspectRatio: 1,
								}}
							>
								<div className="flex flex-col items-center justify-center gap-6">
									<Button intent="secondary" asChild>
										<Link to={[pathname, search].join('')}>Retry</Link>
									</Button>
									{import.meta.env.DEV && (
										<div className="flex w-full max-w-lg flex-col items-center">
											<h3 className="text-border-element-hover-negative label-xs">Dev error</h3>
											<div className="max-h-[20rem] w-full overflow-scroll rounded-3 border border-border-element-negative bg-background-subtle-negative text-copy-lowcontrast-negative body-xs">
												<pre className="px-2 py-2">{getErrorPayload(error).toString()}</pre>
											</div>
										</div>
									)}
								</div>
							</MessageView>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
