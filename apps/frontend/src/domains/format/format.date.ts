import { match } from 'ts-pattern';

const defaultFormatter = new Intl.RelativeTimeFormat('en', {
	style: 'short',
	numeric: 'auto',
});

type Params = {
	from?: Date;
	to: string | Date;
	formatter?: Intl.RelativeTimeFormat;
};

/** From a date, calculates the relative time difference from now */
export const getRelativeTimeDifference = ({ from = new Date(), to, formatter = defaultFormatter }: Params) => {
	const then = to instanceof Date ? to : new Date(to);
	const diff = then.getTime() - from.getTime();

	const diffIn = {
		minutes: Math.round(diff / 1000 / 60),
		hours: Math.round(diff / 1000 / 60 / 60),
		days: Math.round(diff / 1000 / 60 / 60 / 24),
		months: Math.round(diff / 1000 / 60 / 60 / 24 / 30),
	};

	return match(diffIn)
		.when(
			({ minutes }) => Math.abs(minutes) < 60,
			d => formatter.format(d.minutes, 'minutes'),
		)
		.when(
			({ hours }) => Math.abs(hours) < 24,
			d => formatter.format(d.hours, 'hours'),
		)
		.when(
			({ days }) => Math.abs(days) < 30,
			d => formatter.format(d.days, 'days'),
		)
		.otherwise(d => formatter.format(d.months, 'months'));
};
