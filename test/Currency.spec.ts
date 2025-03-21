import { describe, test, expect } from 'vitest';
import { USD } from '../src/Currency.js';
import { Decimal } from 'decimal.js';

describe('Currency', () => {
  test('toDecimal validates inputs are a string or Decimal', () => {
    // @ts-expect-error verifying that runtime type checking is active
    expect(() => new USD().toDecimal(10.0)).toThrow();

    expect(new USD().toDecimal('10.00').toHex()).to.be.eq(
      new Decimal('10.00').toHex(),
    );
    expect(new USD().toDecimal(new Decimal('10.00')).toHex()).to.be.eq(
      new Decimal('10.00').toHex(),
    );
  });
});
