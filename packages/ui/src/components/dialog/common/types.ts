export type DialogProps = {
	/** Content to be rendered inside the dialog. */
	children?: React.ReactNode;
	/** Whether the dialog is open or not. */
	isOpen?: boolean;
	/** Callback to be called when the dialog is opened or closed. */
	onOpenChange?: (isOpen: boolean) => void;
};
