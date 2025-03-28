import { build } from 'tsup';

await build({
  entry: {
    index: 'src/index.ts',
    currency: 'src/currency.ts',
  },
  treeshake: true,
  format: ['cjs', 'esm'],
  bundle: true,
  dts: true,
  experimentalDts: false,
  sourcemap: false,
  splitting: false,
  minify: false
});
