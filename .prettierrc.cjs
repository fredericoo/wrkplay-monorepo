module.exports = {
	arrowParens: 'avoid',
	printWidth: 120,
	useTabs: true,
	singleQuote: true,
	endOfLine: 'auto',
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindConfig: './packages/ui/tailwind.config.ts',
	tailwindFunctions: ['clsx', 'cn', 'cva'],
};
