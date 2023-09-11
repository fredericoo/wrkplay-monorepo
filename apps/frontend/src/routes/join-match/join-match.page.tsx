import { Button, Input } from '@wrkplay/ui';
import { Form, Link } from 'react-router-dom';
import { useActionData } from 'react-router-typesafe';
import { match, P } from 'ts-pattern';

import { InlineError } from '~/domains/error/components/inline-error';

import type { joinMatchAction } from './join-match.action';

export const JoinMatchPage = () => {
	const response = useActionData<typeof joinMatchAction>();

	return (
		<div className="container flex flex-col items-center gap-8 py-8">
			<section className="flex w-full max-w-md flex-col gap-4">
				<div>
					<h1 className="display-2xs">Join a match</h1>
					<p className="text-copy-lowcontrast-neutral body-md">Scan the NFC tag or enter its code below:</p>
				</div>

				<Form className="flex flex-col gap-3" method="POST">
					<Input
						autoCapitalize="off"
						autoComplete="off"
						autoCorrect="off"
						autoFocus
						name="joinTag"
						placeholder="Enter code"
					/>
					<div className="flex gap-2">
						<Button asChild className="flex-1" intent="ghost">
							<Link to="/">Cancel</Link>
						</Button>
						<Button className="flex-1" intent="primary">
							Join
						</Button>
					</div>
				</Form>
				{match(response)
					.with({ error: { message: P.string } }, match => <InlineError>{match.error.message}</InlineError>)
					.otherwise(() => null)}
			</section>
		</div>
	);
};
