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
		'.png': 'dataurl',
		'.gif': 'dataurl',
	},
	format: 'iife',
	globalName: 'Anyline',
	define: { 'process.env.MODE': '"development"' },
});

const isDev = process.argv.includes('--dev');

if (isDev) {
	await ctx.watch();
	await ctx.serve({
		servedir: 'public',
	});
	console.log(`Application is running at: http://localhost:8000`);
} else {
	await ctx.watch();
	await ctx.dispose();
}
