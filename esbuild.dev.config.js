import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
	outdir: 'public',
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'browser',
	target: ['es2015'],
	loader: {
		'.ts': 'ts',
	},
	format: 'iife',
	globalName: 'Anyline',
});

await ctx.watch();

await ctx.serve({
	servedir: 'public',
});
