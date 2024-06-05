import esbuild from 'esbuild';
import { injectCSSPlugin } from './esbuild/injectCSSPlugin.js';

const baseConfig = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	platform: 'browser',
	sourcemap: true,
	target: ['es2015'],
	loader: {
		'.ts': 'ts',
		'.svg': 'dataurl',
		'.png': 'dataurl',
		'.gif': 'dataurl',
	},
	define: { 'process.env.MODE': '"production"' },
};

// ESM
esbuild
	.build({
		...baseConfig,
		plugins: [injectCSSPlugin('../dist/esm/')],
		outdir: 'dist/esm/',
		format: 'esm',
		splitting: true,
		chunkNames: 'chunks/[name]-[hash]',
	})
	.catch(() => process.exit(1));

// IIFE for <script> tag
esbuild
	.build({
		...baseConfig,
		plugins: [injectCSSPlugin('../dist/iife/')],
		outfile: 'dist/iife/index.js',
		format: 'iife',
		globalName: 'Anyline',
	})
	.catch(() => process.exit(1));

// CJS
esbuild
	.build({
		...baseConfig,
		plugins: [injectCSSPlugin('../dist/cjs/')],
		outfile: 'dist/cjs/index.js',
		format: 'cjs',
	})
	.catch(() => process.exit(1));
