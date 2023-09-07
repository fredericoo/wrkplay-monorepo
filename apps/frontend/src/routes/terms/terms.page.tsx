import { Navbar } from '~/domains/common/components';

export const TermsPage = () => {
	return (
		<>
			<Navbar />

			<div className="container flex max-w-xl flex-col gap-4 py-8 pt-24 body-md">
				<h1 className="display-2xs">Terms of Service & Privacy Policy</h1>
				<h2 className="heading-md">Terms of Service</h2>
				<p>
					By using the workplay website located at https://workplay.app, you agree to be bound by the following terms
					and conditions:
				</p>
				<ul className="list-decimal">
					<li>You must be 18 years of age or older to use this website.</li>
					<li>
						You may not use this website for any illegal purpose or in violation of any local, state, national, or
						international law.
					</li>
					<li>workplay reserves the right to modify or discontinue the website at any time without notice.</li>
					<li>The website and its contents are provided on an 'as is' basis without warranties of any kind.</li>
					<li>You agree to release workplay from all liability arising from your use of the website.</li>
				</ul>
				<h2 className="heading-md">Privacy Policy</h2>
				<p>
					workplay respects your privacy and is committed to protecting your personal data. We will only collect and use
					your data as described in this policy:
				</p>
				<ul className="list-decimal">
					<li>
						We collect your name, email, and any other personal details you provide when you interact with our website.
					</li>
					<li>Your personal data is only used to provide our services and communicate with you.</li>
					<li>We do not share your personal data with any third parties without your consent.</li>
					<li>You have the right to request access to and correction of your personal data.</li>
				</ul>
				<p>
					This policy is effective as of September 7, 2023. We may update this policy from time to time. If we make
					significant changes, we will notify you by email or by posting a notice on our website.
				</p>
			</div>
		</>
	);
};
