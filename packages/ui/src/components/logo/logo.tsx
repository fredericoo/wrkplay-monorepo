import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 136 134">
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeWidth={80}
			d="M45.9 91V53c0-4.4 0-6.7 1.4-8 1.3-1.5 3.6-1.5 8-1.5H91"
		/>
		<mask
			id="b"
			width={125}
			height={128}
			x={6}
			y={3}
			maskUnits="userSpaceOnUse"
			style={{
				maskType: 'alpha',
			}}
		>
			<path
				fill="#A0F"
				fillRule="evenodd"
				d="M55 4h35.9a39.5 39.5 0 1 1 0 79h-5.5v8a39.5 39.5 0 1 1-79 0V52.7c0-1.6-.1-6 .5-10.1.7-5.7 3.1-16.4 12.4-25.6A44.1 44.1 0 0 1 44.9 4.5C49 4 53.4 4 54.9 4Zm30.4 47Zm-32 32Z"
				clipRule="evenodd"
			/>
		</mask>
		<g filter="url(#a)" mask="url(#b)">
			<g clipPath="url(#c)">
				<rect width={64} height={64} x={60} y={11.2} fill="#F00056" rx={32} />
				<g filter="url(#d)">
					<ellipse cx={88.9} cy={33.1} fill="#592FFA" rx={35.1} ry={34.5} />
				</g>
				<g filter="url(#e)">
					<ellipse cx={82.1} cy={20.5} fill="#0BC3EB" rx={21.5} ry={21} />
				</g>
				<g filter="url(#f)" opacity={0.6}>
					<ellipse cx={9.1} cy={5.4} fill="#FFFEFF" rx={9.1} ry={5.4} transform="translate(89.3 66)" />
				</g>
			</g>
		</g>
		<defs>
			<filter
				id="a"
				width={82}
				height={82}
				x={51}
				y={9.2}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feOffset dy={2} />
				<feGaussianBlur stdDeviation={1.5} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0.184314 0 0 0 0 0.0156863 0 0 0 0 0.313726 0 0 0 0.3 0" />
				<feBlend in2="BackgroundImageFix" mode="multiply" result="effect1_dropShadow_479_84509" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feOffset dy={7} />
				<feGaussianBlur stdDeviation={4.5} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0.184314 0 0 0 0 0.0156863 0 0 0 0 0.313726 0 0 0 0.3 0" />
				<feBlend in2="effect1_dropShadow_479_84509" mode="multiply" result="effect2_dropShadow_479_84509" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feMorphology in="SourceAlpha" radius={2} result="effect3_dropShadow_479_84509" />
				<feOffset dx={2} dy={4} />
				<feGaussianBlur stdDeviation={3} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0.941176 0 0 0 0 0 0 0 0 0 0.337255 0 0 0 0.5 0" />
				<feBlend in2="effect2_dropShadow_479_84509" result="effect3_dropShadow_479_84509" />
				<feBlend in="SourceGraphic" in2="effect3_dropShadow_479_84509" result="shape" />
				<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
				<feMorphology in="SourceAlpha" radius={1.3} result="effect4_innerShadow_479_84509" />
				<feOffset />
				<feGaussianBlur stdDeviation={4.9} />
				<feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
				<feColorMatrix values="0 0 0 0 0.396078 0 0 0 0 0.415686 0 0 0 0 0.835294 0 0 0 1 0" />
				<feBlend in2="shape" mode="lighten" result="effect4_innerShadow_479_84509" />
			</filter>
			<filter
				id="d"
				width={109.1}
				height={107.8}
				x={34.3}
				y={-20.8}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feGaussianBlur result="effect1_foregroundBlur_479_84509" stdDeviation={9.7} />
			</filter>
			<filter
				id="e"
				width={86.2}
				height={85.1}
				x={39}
				y={-22.1}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feGaussianBlur result="effect1_foregroundBlur_479_84509" stdDeviation={10.8} />
			</filter>
			<filter
				id="f"
				width={37.4}
				height={30.6}
				x={80.6}
				y={54.3}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feGaussianBlur result="effect1_foregroundBlur_479_84509" stdDeviation={4.9} />
			</filter>
			<clipPath id="c">
				<rect width={64} height={64} x={60} y={11.2} fill="#fff" rx={32} />
			</clipPath>
		</defs>
	</svg>
);
