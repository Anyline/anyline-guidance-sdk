import * as esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';

const ctx = await esbuild.context({
	outdir: 'public',
	entryPoints: ['src/index.html'],
	bundle: true,
	platform: 'browser',
	target: ['es2015'],
	loader: {
		'.ts': 'ts',
		'.svg': 'dataurl',
	},
	format: 'iife',
	globalName: 'Anyline',
	chunkNames: '[ext]/[name]-[hash]',
	plugins: [htmlPlugin()],
});

await ctx.watch();

await ctx.serve({
	servedir: 'public',
});
