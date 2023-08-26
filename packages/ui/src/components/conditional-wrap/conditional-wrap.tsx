type ConditionalWrapProps = {
	condition: any;
	wrap: (children: React.ReactNode) => React.ReactNode;
	children: React.ReactNode;
};

export const ConditionalWrap = ({ condition, wrap, children }: ConditionalWrapProps) => (
	<>{condition ? wrap(children) : children}</>
);
