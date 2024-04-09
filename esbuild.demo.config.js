import * as esbuild from 'esbuild';

const ctx = await esbuild.context({
	outfile: 'public/build/index.js',
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'browser',
	target: ['es2015'],
	loader: {
		'.ts': 'ts',
		'.svg': 'dataurl',
	},
	format: 'iife',
	globalName: 'Anyline',
});

const isDev = process.argv.includes('--a');

if (isDev) {
	await ctx.watch();
	await ctx.serve({
		servedir: 'public',
	});
} else {
	await ctx.watch();
	await ctx.dispose();
}
