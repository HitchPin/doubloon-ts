import { describe, test, expect } from 'vitest';
import { CAD, registry, USD } from '../src2/currency.js';
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

  test('Registry throws on unknown currency', () => {
    expect(() => registry.byName('HYPE')).toThrow();
  });

  test('Dollar formats are identical', () => {
    // I must admit this test only exists to get to 100% coverage
    // and I needed to cover CAD formatting
    expect(new USD().format(new Decimal('1.23'))).to.be.eq(new CAD().format(new Decimal('1.23')));
  });
});
