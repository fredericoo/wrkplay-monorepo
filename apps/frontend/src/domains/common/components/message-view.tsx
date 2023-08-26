import { cn } from '@wrkplay/ui/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';
import { match } from 'ts-pattern';

const fileFormats = {
	image: ['png', 'jpg', 'gif', 'jpeg', 'webm', 'avif', 'svg'],
	video: ['mp4', 'mov', 'webm', 'avi'],
} as const;

const videoSourceTypeMap: Record<(typeof fileFormats)['video'][number], string> = {
	mp4: 'video/mp4',
	mov: 'video/mov',
	webm: 'video/webm',
	avi: 'video/avi',
};

type ImageIllustrationSrc = `${string}.${(typeof fileFormats)['image'][number]}`;
type VideoIllustrationSrc = `${string}.${(typeof fileFormats)['video'][number]}`;

type ImageIllustration = {
	type: 'image';
	src: ImageIllustrationSrc;
	aspectRatio: number;
	loop?: never;
};

type VideoIllustration = {
	type: 'video';
	src: VideoIllustrationSrc;
	aspectRatio: number;
	loop?: boolean;
};

type MessageViewProps = {
	heading: string;
	message?: string | JSX.Element;
	headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	illustration?: ImageIllustration | VideoIllustration;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const MessageView = ({
	heading,
	headingLevel: Heading,
	message,
	illustration,
	children,
	className,
	...props
}: MessageViewProps) => {
	return (
		<div className={cn('flex flex-col items-center justify-center gap-2 text-center', className)} {...props}>
			{illustration && (
				<div className="w-full max-w-sm">
					<div style={{ aspectRatio: illustration.aspectRatio }}>
						{match(illustration)
							.with({ type: 'image' }, image => <img src={image.src} alt="" className="h-full w-full object-cover" />)
							.with({ type: 'video' }, video => {
								const ext = video.src.slice(video.src.lastIndexOf('.'));
								return (
									<video
										className="h-full w-full object-cover"
										autoPlay
										playsInline
										muted
										controls={false}
										loop={video.loop}
									>
										<source src={video.src} type={videoSourceTypeMap[ext as (typeof fileFormats)['video'][number]]} />
									</video>
								);
							})
							.exhaustive()}
					</div>
				</div>
			)}
			<Heading className="heading-lg">{heading}</Heading>
			{message && <p className="max-w-sm text-copy-lowcontrast-neutral body-md">{message}</p>}
			{children}
		</div>
	);
};
