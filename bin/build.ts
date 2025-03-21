import { build } from 'tsup';

await build({
  entry: {
    index: 'src/index.ts',
    currencies: 'src/Currency.ts',
  },
  format: ['cjs', 'esm'],
  bundle: false,
  dts: true,
  sourcemap: false,
});
