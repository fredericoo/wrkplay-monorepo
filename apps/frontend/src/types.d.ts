import type { Plugin } from 'vite';

declare module 'vite-plugin-vsharp' {
	export default function vsharp(): Plugin;
}
