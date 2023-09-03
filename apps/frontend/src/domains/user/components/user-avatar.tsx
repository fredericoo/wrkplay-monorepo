import type { AvatarFallbackVariants, AvatarProps } from '@wrkplay/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@wrkplay/ui';

import { getInitials } from '../user.utils';

/** Not very random way of getting a number from a string.
 *  This is used to get a unique color for each name.
 */
export const strToHashedNumber = (inputString: string) =>
	+inputString
		.split('')
		.map(char => char.charCodeAt(0))
		.join('');

type UserAvatarProps = { user: { name: string; avatar_url?: string } } & AvatarProps;

const colorSchemesAvailable: NonNullable<AvatarFallbackVariants['variant']>[] = [1, 2, 3, 4];

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
	const variant = ((strToHashedNumber(user.name) % colorSchemesAvailable.length) +
		1) as AvatarFallbackVariants['variant'];
	return (
		<Avatar {...props}>
			{user.avatar_url && <AvatarImage src={user.avatar_url} />}
			<AvatarFallback variant={variant}>{getInitials(user.name)}</AvatarFallback>
		</Avatar>
	);
};
