const { build } = require('esbuild');
const { devDependencies } = require('./package.json');

const buildOptions = {
    bundle: true,
    entryPoints: ['./src/index.ts'],
    external: [...Object.keys(devDependencies)],
    minify: true,
};

Promise.all([
    build({
        ...buildOptions,
        format: 'cjs',
        outdir: 'dist/cjs',
    }),
    build({
        ...buildOptions,
        format: 'esm',
        outdir: 'dist/esm',
        splitting: true,
    }),
]).catch(() => process.exit(1));
