import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import * as Drawer from '.';

const isCI = process.env.CI === 'true';

describe.skipIf(isCI)('<BottomSheetDialog />', () => {
	test('does not render modal content when closed', () => {
		render(
			<Drawer.Root isOpen={false}>
				<Drawer.Trigger>
					<button>trigger</button>
				</Drawer.Trigger>
				<Drawer.Content position="right">
					<div>Modal content</div>
				</Drawer.Content>
			</Drawer.Root>
		);

		const trigger = screen.getByRole('button', { name: 'trigger' });
		const modalContent = screen.queryByText('Modal content');

		expect(modalContent).toBeNull();
		expect(trigger).toBeInTheDocument();
	});

	test('renders modal content when open', () => {
		render(
			<Drawer.Root isOpen={true}>
				<Drawer.Trigger>
					<button>trigger</button>
				</Drawer.Trigger>
				<Drawer.Content position="right">
					<div>Modal content</div>
				</Drawer.Content>
			</Drawer.Root>
		);

		const modalContent = screen.queryByText('Modal content');

		expect(modalContent).toBeInTheDocument();
	});

	test('calls onOpenChange with opposite value when clicking trigger', async () => {
		const onOpenChange = vi.fn();

		render(
			<Drawer.Root isOpen={false} onOpenChange={onOpenChange}>
				<Drawer.Trigger>
					<button>trigger</button>
				</Drawer.Trigger>
				<Drawer.Content position="right">
					<div>Modal content</div>
				</Drawer.Content>
			</Drawer.Root>
		);

		const trigger = screen.getByRole('button', { name: 'trigger' });
		userEvent.click(trigger);

		await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
	});

	test('renders title when open', () => {
		render(
			<Drawer.Root isOpen={true}>
				<Drawer.Trigger>
					<button>trigger</button>
				</Drawer.Trigger>
				<Drawer.Content position="right">
					<Drawer.Header>Title</Drawer.Header>
					<div>Modal content</div>
				</Drawer.Content>
			</Drawer.Root>
		);

		const title = screen.queryByText('Title');

		expect(title).toBeInTheDocument();
	});
});
