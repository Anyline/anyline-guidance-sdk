import esbuild from 'esbuild';

const baseConfig = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	platform: 'browser',
	minify: true,
	sourcemap: true,
	target: ['es2015'],
	loader: {
		'.ts': 'ts',
		'.svg': 'dataurl',
	},
};

// ESM
esbuild
	.build({
		...baseConfig,
		outfile: 'dist/esm/index.js',
		format: 'esm',
	})
	.catch(() => process.exit(1));

// IIFE for <script> tag
esbuild
	.build({
		...baseConfig,
		outfile: 'dist/iife/index.js',
		format: 'iife',
		globalName: 'Anyline',
	})
	.catch(() => process.exit(1));

// CJS
esbuild
	.build({
		...baseConfig,
		outfile: 'dist/cjs/index.js',
		format: 'cjs',
	})
	.catch(() => process.exit(1));

esbuild.build()
