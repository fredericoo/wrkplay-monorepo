import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import * as ActionSheet from '.';
import { Modal } from '../..';
import { IconBuildingsAncientGateLine } from '../../../../icons';
import { Box, Container, Stack } from '../../../layout';
import { Button } from '../../button';
import { Heading } from '../../heading';
import { Image } from '../../image';
import { Text } from '../../text';
import { useNestedDialog } from '../nested';

const Component = ActionSheet.Root;

const meta: ComponentMeta<typeof Component> = {
	title: 'Organisms/ActionSheet',
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
		<ActionSheet.Trigger>
			<Button variant="primary">Kitties inside</Button>
		</ActionSheet.Trigger>,
		<ActionSheet.Content>
			<ActionSheet.Header>
				<ActionSheet.Close />
				<Container size="lg" paddingBlock={2} paddingBlockStart={8}>
					<Heading size="md" textAlign="center">
						Cats
					</Heading>
				</Container>
			</ActionSheet.Header>
			<ActionSheet.Body>
				<Stack flexDirection="column" padding={8} gap="$4">
					<Heading size="md">Hope you like cats</Heading>
					<Text color="neutral.500">Here’s one to make your day:</Text>
					<Image
						backgroundColor="neutral.100"
						src={`https://source.unsplash.com/random/1080x1080/?cute-kitten`}
						alt="random"
						layout="responsive"
						height={800}
						width={800}
						reveal="fade"
					/>
				</Stack>
			</ActionSheet.Body>
		</ActionSheet.Content>,
	],
};

export const WithScrollableArea = Template.bind({});
WithScrollableArea.args = {
	children: [
		<ActionSheet.Trigger>
			<Button variant="primary">Click for boring cards</Button>
		</ActionSheet.Trigger>,
		<ActionSheet.Content>
			<ActionSheet.Header>
				<ActionSheet.Close />
				<Container size="lg" paddingBlock={2} paddingBlockStart={8}>
					<Heading size="md" textAlign="center">
						Cards
					</Heading>
				</Container>
			</ActionSheet.Header>
			<ActionSheet.Body>
				<ActionSheet.ScrollArea>
					<Box>
						{Array.from({ length: 128 }).map((_, i) => {
							return <ActionSheet.Item iconStart={IconBuildingsAncientGateLine} label={`item ${i}`} key={i} />;
						})}
					</Box>
				</ActionSheet.ScrollArea>
			</ActionSheet.Body>
		</ActionSheet.Content>,
	],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NestedTemplate: ComponentStory<typeof Component> = ({ isOpen, onOpenChange, ...props }) => {
	const [open, setIsOpen] = React.useState(false);
	const [subOpen, setIsSubOpen] = React.useState(false);
	const { NestedDialogWrapper, container } = useNestedDialog();

	return (
		<Component isOpen={isOpen || open} onOpenChange={setIsOpen} {...props}>
			<ActionSheet.Trigger>
				<Button variant="primary">Destroy the universe</Button>
			</ActionSheet.Trigger>
			<ActionSheet.Content h="$full">
				<ActionSheet.Header>
					<ActionSheet.Close />
					<Container size="lg" paddingBlock={2} paddingBlockStart={8}>
						<Heading size="md" textAlign="center">
							Destroy the universe
						</Heading>
					</Container>
				</ActionSheet.Header>
				<ActionSheet.Body backgroundColor="error.background">
					<NestedDialogWrapper padding={8} height="$full">
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
				</ActionSheet.Body>
			</ActionSheet.Content>
		</Component>
	);
};

export const NestedDialogs = NestedTemplate.bind({});
NestedDialogs.args = {};
