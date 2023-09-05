import { Button } from '@wrkplay/ui';
import { Form } from 'react-router-dom';

import Logo from '~/assets/logo.png';

export const LogoutPage = () => {
	return (
		<div className="container flex h-full flex-grow flex-col items-center justify-center gap-8">
			<div className="flex items-center gap-2">
				<img className="h-8 w-8" src={Logo} alt="wrkplay" />
				<h1 className="display-2xs">workplay</h1>
			</div>
			<Form method="POST">
				<Button>Sign out</Button>
			</Form>
		</div>
	);
};
