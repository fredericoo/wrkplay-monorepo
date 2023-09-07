import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import * as ActionSheet from '.';

const isCI = process.env.CI === 'true';

describe.skipIf(isCI)('<BottomSheetDialog />', () => {
	test('does not render modal content when closed', () => {
		render(
			<ActionSheet.Root isOpen={false}>
				<ActionSheet.Trigger>
					<button>trigger</button>
				</ActionSheet.Trigger>
				<ActionSheet.Content>
					<div>Modal content</div>
				</ActionSheet.Content>
			</ActionSheet.Root>
		);

		const trigger = screen.getByRole('button', { name: 'trigger' });
		const modalContent = screen.queryByText('Modal content');

		expect(modalContent).toBeNull();
		expect(trigger).toBeInTheDocument();
	});

	test('renders modal content when open', () => {
		render(
			<ActionSheet.Root isOpen={true}>
				<ActionSheet.Trigger>
					<button>trigger</button>
				</ActionSheet.Trigger>
				<ActionSheet.Content>
					<div>Modal content</div>
				</ActionSheet.Content>
			</ActionSheet.Root>
		);

		const modalContent = screen.queryByText('Modal content');

		expect(modalContent).toBeInTheDocument();
	});

	test('calls onOpenChange with opposite value when clicking trigger', async () => {
		const onOpenChange = vi.fn();

		render(
			<ActionSheet.Root isOpen={false} onOpenChange={onOpenChange}>
				<ActionSheet.Trigger>
					<button>trigger</button>
				</ActionSheet.Trigger>
				<ActionSheet.Content>
					<div>Modal content</div>
				</ActionSheet.Content>
			</ActionSheet.Root>
		);

		const trigger = screen.getByRole('button', { name: 'trigger' });
		userEvent.click(trigger);

		await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
	});

	test('renders title when open', () => {
		render(
			<ActionSheet.Root isOpen={true}>
				<ActionSheet.Trigger>
					<button>trigger</button>
				</ActionSheet.Trigger>
				<ActionSheet.Content>
					<ActionSheet.Header>Title</ActionSheet.Header>
					<div>Modal content</div>
				</ActionSheet.Content>
			</ActionSheet.Root>
		);

		const title = screen.queryByText('Title');

		expect(title).toBeInTheDocument();
	});
});
