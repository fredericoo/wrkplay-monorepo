import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../../lib/utils';
import { buttonVariants } from '../button/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm font-medium',
				nav: 'space-x-1 flex items-center',
				nav_button: cn(buttonVariants({ intent: 'ghost' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
				nav_button_previous: 'absolute left-1',
				nav_button_next: 'absolute right-1',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell: 'text-copy-lowcontrast-neutral rounded-md w-9 font-normal text-[0.8rem]',
				row: 'flex w-full mt-2',
				cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-interactive-solid-primary first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
				day: cn(buttonVariants({ intent: 'ghost' }), 'font-normal h-9 w-9 p-0 aria-selected:opacity-100'),
				day_selected:
					'bg-interactive-solid-primary text-copy-inverted hover:bg-interactive-solid-primary hover:text-copy-inverted focus:bg-interactive-solid-primary focus:text-copy-inverted',
				day_today: 'bg-background-subtle-neutral text-copy-highcontrast-neutral',
				day_outside: 'text-copy-lowcontrast-neutral opacity-50',
				day_disabled: 'text-copy-lowcontrast-neutral opacity-50',
				day_range_middle: 'aria-selected:bg-background-subtle-neutral aria-selected:text-copy-highcontrast-neutral',
				day_hidden: 'invisible',
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = 'Calendar';

export { Calendar };
