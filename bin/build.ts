import { build } from 'tsup';

await build({
  entry: {
    index: 'src/index.ts',
    currencies: 'src/Currency.ts',
  },
  treeshake: true,
  format: ['cjs', 'esm'],
  bundle: false,
  dts: true,
  experimentalDts: false,
  sourcemap: false,
  splitting: false,
  minify: false
});
