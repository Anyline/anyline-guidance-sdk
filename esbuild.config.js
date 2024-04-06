import esbuild from 'esbuild';

// Run TypeScript through esbuild
async function build() {
  // Build CommonJS
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: ['node12'],
    outdir: 'dist/cjs',
    format: 'cjs',
    loader: { '.ts': 'ts' },
  });

  // Build ES Module
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    target: ['node12'],
    outdir: 'dist/esm',
    format: 'esm',
    loader: { '.ts': 'ts' },
  });
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
