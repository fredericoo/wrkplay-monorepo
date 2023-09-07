import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import * as Drawer from '.';
import { Modal } from '../..';
import { Container, Stack } from '../../../layout';
import { Button } from '../../button';
import { Card } from '../../card';
import { Heading } from '../../heading';
import { Image } from '../../image';
import { Select } from '../../select';
import { Text } from '../../text';
import { useNestedDialog } from '../nested';

const Component = Drawer.Root;

const meta: ComponentMeta<typeof Component> = {
	title: 'Organisms/Drawer',
	component: Component,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		isOpen: {
			control: {
				type: 'boolean',
			},
			description: 'Whether the dialog is open, when controlled.',
		},
		onOpenChange: {
			control: {
				type: 'function',
			},
			description: 'Callback when the dialog is opened or closed.',
		},
	},
};
export default meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Component> = ({ isOpen, onOpenChange, ...props }) => {
	const [open, setIsOpen] = React.useState(false);
	return <Component isOpen={isOpen || open} onOpenChange={setIsOpen} {...props} />;
};

export const WithHeader = Template.bind({});
WithHeader.args = {
	children: [
		<Drawer.Trigger>
			<Button variant="primary">See Dog photos</Button>
		</Drawer.Trigger>,
		<Drawer.Content position="right">
			<Drawer.Header>
				<Container size="lg" paddingBlock={4}>
					<Stack alignItems="center">
						<Heading size="md" flexGrow="1">
							Dogs
						</Heading>
						<Drawer.Close />
					</Stack>
				</Container>
			</Drawer.Header>
			<Drawer.Body>
				<Stack flexDirection="column" padding={8} gap="$4">
					<Heading size="md">Hope you like dogs</Heading>
					<Text color="neutral.500">Here’s one to make your day:</Text>
					<Image
						backgroundColor="neutral.100"
						src={`https://source.unsplash.com/random/1080x1080/?cute-puppy`}
						alt="random"
						layout="responsive"
						height={800}
						width={800}
						reveal="fade"
					/>
				</Stack>
			</Drawer.Body>
		</Drawer.Content>,
	],
};

export const AutomaticScrollableContent = Template.bind({});
AutomaticScrollableContent.args = {
	children: [
		<Drawer.Trigger>
			<Button variant="primary">See a boring list</Button>
		</Drawer.Trigger>,
		<Drawer.Content position="right">
			<Drawer.Header>
				<Container size="lg" paddingBlock={4}>
					<Stack alignItems="center">
						<Heading size="md" flexGrow="1">
							Boring list
						</Heading>
						<Drawer.Close />
					</Stack>
				</Container>
			</Drawer.Header>
			<Drawer.Body>
				<Select
					options={Array.from({ length: 128 }).map((_, i) => {
						return { value: i.toString(), label: `item ${i + 1}` };
					})}
					placeholder="Select an item"
				/>
				<Stack padding={8} flexDirection="column" gap="$4">
					{Array.from({ length: 128 }).map((_, i) => {
						return <Card key={i}>item {i + 1}</Card>;
					})}
				</Stack>
			</Drawer.Body>
		</Drawer.Content>,
	],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NestedTemplate: ComponentStory<typeof Component> = ({ isOpen, onOpenChange, ...props }) => {
	const [open, setIsOpen] = React.useState(false);
	const [subOpen, setIsSubOpen] = React.useState(false);
	const { NestedDialogWrapper, container } = useNestedDialog();

	return (
		<Component isOpen={isOpen || open} onOpenChange={setIsOpen} {...props}>
			<Drawer.Trigger>
				<Button variant="primary">Do it</Button>
			</Drawer.Trigger>
			<Drawer.Content position="right">
				<Drawer.Header>
					<Container size="lg" paddingBlock={4}>
						<Stack alignItems="center">
							<Heading size="md" flexGrow="1">
								Dogs
							</Heading>
							<Drawer.Close />
						</Stack>
					</Container>
				</Drawer.Header>
				<Drawer.Body>
					<NestedDialogWrapper padding={8}>
						<Modal.Root type="alert" isOpen={subOpen} onOpenChange={setIsSubOpen}>
							<Modal.Trigger>
								<Button variant="destroy">Delete everything</Button>
							</Modal.Trigger>

							<Modal.Content variant="default" verticalAlign="center" container={container}>
								<Stack gap="$3" padding={4} alignItems="center">
									<Modal.Title flexGrow="1" size="lg">
										Are you sure?
									</Modal.Title>
									<Modal.CloseButton />
								</Stack>
								<Stack flexDirection="column" gap="$4" padding={4} paddingBlockStart={0}>
									<Modal.Description color="neutral.500">
										This action will delete the universe. Are you sure you want to continue?
									</Modal.Description>

									<Stack gap="$3">
										<Button variant="default" onClick={() => setIsSubOpen(false)} width={110}>
											Cancel
										</Button>
										<Button variant="destroy" flexGrow="1">
											Yes, delete
										</Button>
									</Stack>
								</Stack>
							</Modal.Content>
						</Modal.Root>
					</NestedDialogWrapper>
				</Drawer.Body>
			</Drawer.Content>
		</Component>
	);
};

export const NestedDialogs = NestedTemplate.bind({});
NestedDialogs.args = {};

const StackedTemplate: ComponentStory<typeof Component> = ({ isOpen, onOpenChange, ...props }) => {
	const [open, setIsOpen] = React.useState(false);
	const [subOpen, setIsSubOpen] = React.useState(false);

	return (
		<Component isOpen={isOpen || open} onOpenChange={setIsOpen} {...props}>
			<Drawer.Trigger>
				<Button variant="primary">Do it</Button>
			</Drawer.Trigger>
			<Drawer.Content position="right">
				<Drawer.Header>
					<Container size="lg" paddingBlock={4}>
						<Stack alignItems="center">
							<Heading size="md" flexGrow="1">
								Stacked dialogs demo
							</Heading>
							<Drawer.Close />
						</Stack>
					</Container>
				</Drawer.Header>
				<Drawer.Body>
					<Modal.Root type="alert" isOpen={subOpen} onOpenChange={setIsSubOpen}>
						<Modal.Trigger>
							<Button variant="destroy">Delete everything</Button>
						</Modal.Trigger>

						<Modal.Content variant="default" verticalAlign="center">
							<Stack gap="$3" padding={4} alignItems="center">
								<Modal.Title flexGrow="1" size="lg">
									Are you sure?
								</Modal.Title>
								<Modal.CloseButton />
							</Stack>
							<Stack flexDirection="column" gap="$4" padding={4} paddingBlockStart={0}>
								<Modal.Description color="neutral.500">
									This action will delete the universe. Are you sure you want to continue?
								</Modal.Description>

								<Stack gap="$3">
									<Button variant="default" onClick={() => setIsSubOpen(false)} width={110}>
										Cancel
									</Button>
									<Button variant="destroy" flexGrow="1">
										Yes, delete
									</Button>
								</Stack>
							</Stack>
						</Modal.Content>
					</Modal.Root>
				</Drawer.Body>
			</Drawer.Content>
		</Component>
	);
};

export const StackedDialogs = StackedTemplate.bind({});
StackedDialogs.args = {};
