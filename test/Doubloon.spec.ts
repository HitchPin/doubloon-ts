import { describe, test, expect } from 'vitest';
import { Doubloon } from '../src/Doubloon.js';
import { USD, CAD, EUR } from '../src/currency.js';
import { Decimal } from 'decimal.js';

describe('Doubloon', () => {
  test('Doubloons are only creatable via a string or Decimal', () => {
    // @ts-expect-error verifying that runtime type checking is active
    expect(() => new Doubloon<USD>(USD, 10.0)).toThrow();

    expect(new Doubloon<USD>(USD, '10.00').str()).to.be.eq('10.00');
    expect(new Doubloon<USD>(USD, new Decimal('10.00')).str()).to.be.eq(
      '10.00',
    );
  });

  test('Creating a doubloon with a decimal requires the correct precision.', () => {
    expect(() => new Doubloon<USD>(USD, new Decimal('10.001'))).toThrow();
    expect(new Doubloon<USD>(USD, new Decimal('10.0')).str()).to.be.eq('10.00'); // ok to have less precision
    expect(new Doubloon<USD>(USD, new Decimal('10.00')).str()).to.be.eq(
      '10.00',
    );
  });

  test('Internally creating a doubloon via division allows higher precision', () => {
    const x = new Doubloon<USD>(USD, new Decimal('1.00'));
    const xDiv = x.div(3);
    const xAdd = xDiv.add(new Doubloon<USD>(USD, new Decimal('5.00')));
    const xSub = xAdd.add(new Doubloon<USD>(USD, new Decimal('5.00')));
    const xMul = xSub.add(new Doubloon<USD>(USD, new Decimal('5.00')));
    expect(xMul.str()).toBe('15.33');
  });
  
  test('Creating a doubloon with a string requires the correct precision.', () => {
    expect(() => new Doubloon<USD>(USD, '10.000').str()).toThrow();
    expect(() => new Doubloon<USD>(USD, '10.001').str()).toThrow();
    expect(new Doubloon<USD>(USD, '10.0').str()).to.be.eq('10.00'); // ok to have less precision
    expect(new Doubloon<USD>(USD, '10.00').str()).to.be.eq('10.00');
  });

  test('Adding two Doubloons enforces currency matching', () => {
    const x = new Doubloon<USD>(USD, '1.25');
    const y = new Doubloon<CAD>(CAD, '2.25');
    // TODO: why isn't this a type error?
    expect(() => x.add(y)).toThrow();

    const z = new Doubloon<CAD>(CAD, '3.48');
    expect(y.add(z).str()).to.be.eq('5.73');
  });
  test('Subtracting two Doubloons enforces currency matching', () => {
    const x = new Doubloon<CAD>(CAD, '2.25');
    const y = new Doubloon<USD>(USD, '1.25');
    // TODO: why isn't this a type error?
    expect(() => x.sub(y)).toThrow();

    const z = new Doubloon<CAD>(CAD, '1.15');
    expect(x.sub(z).str()).to.be.eq('1.10');
  });
  test('Multiplying two Doubloons enforces scalar', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    const y = new Doubloon<USD>(USD, '1.25');
    // @ts-expect-error verifying that runtime type checking is active
    expect(() => x.mul(y)).toThrow();
    expect(() => x.mul(3.14)).toThrow(); // only integers allowed

    expect(x.mul(new Decimal(0.15)).str()).to.be.eq('0.34');
    expect(x.mul(3).str()).to.be.eq('6.75');
  });
  test('Dividing two Doubloons enforces scalar', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    const y = new Doubloon<USD>(USD, '1.25');
    // @ts-expect-error verifying that runtime type checking is active
    expect(() => x.div(y)).toThrow();
    expect(() => x.div(3.14)).toThrow(); // only integers allowed

    expect(x.div(new Decimal(0.5)).str()).to.be.eq('4.50');
    expect(x.div(3).str()).to.be.eq('0.75');
  });
  test('Comparing two Doubloons for equality enforces same currency', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    const y = new Doubloon<CAD>(CAD, '1.25');
    expect(() => x.eq(y)).toThrow();
  });
  test('Comparing two Doubloons for inequality enforces same currency', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    const y = new Doubloon<CAD>(CAD, '1.25');
    expect(() => x.lt(y)).toThrow();
    expect(() => x.gt(y)).toThrow();
    expect(() => x.lte(y)).toThrow();
    expect(() => x.gte(y)).toThrow();
  });

  test('Boolean operators perform correct comparisons', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    const zLt = new Doubloon<USD>(USD, '2.24');
    const zGt = new Doubloon<USD>(USD, '2.26');
    const zEq = new Doubloon<USD>(USD, '2.25');
    expect(x.lt(zLt)).to.be.eq(false);
    expect(x.lte(zLt)).to.be.eq(false);
    expect(x.eq(zLt)).to.be.eq(false);
    expect(x.gte(zLt)).to.be.eq(true);
    expect(x.gt(zLt)).to.be.eq(true);

    expect(x.lt(zGt)).to.be.eq(true);
    expect(x.lte(zGt)).to.be.eq(true);
    expect(x.eq(zGt)).to.be.eq(false);
    expect(x.gte(zGt)).to.be.eq(false);
    expect(x.gt(zGt)).to.be.eq(false);

    expect(x.lt(zEq)).to.be.eq(false);
    expect(x.lte(zEq)).to.be.eq(true);
    expect(x.eq(zEq)).to.be.eq(true);
    expect(x.gte(zEq)).to.be.eq(true);
    expect(x.gt(zEq)).to.be.eq(false);
  });

  test('toString() returns generic type name and value', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    expect(x.toString()).to.be.eq('Doubloon<USD>(2.25)');
  });

  test('format() returns value with currency symbol', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    expect(x.format()).to.be.eq('$2.25');

    const y = new Doubloon<EUR>(EUR, '2.25');
    expect(y.format()).to.be.eq('2.25€');
  });

  test("str rounds by banker's rounding", () => {
    const x = new Doubloon<USD>(USD, '2.25');
    expect(x.div(2).str()).to.be.eq('1.12');

    const y = new Doubloon<USD>(USD, '2.27');
    expect(y.div(2).str()).to.be.eq('1.14');
  });

  test('Serializes to JSON object with canonical value', () => {
    const x = new Doubloon<USD>(USD, '2.25');
    expect(x.toJSON()).to.be.eql({
      canonical: 'WyJVU0QiLCIyLjI1Il0=',
      displayOnly: '$2.25',
    });
  });
  test('Parses JSON envelope object', () => {
    const d = Doubloon.parse({
      canonical: "WyJVU0QiLCIyLjI1Il0=",
      displayOnly: '$2.25',
    });
    expect(d.toString()).to.be.eql('Doubloon<USD>(2.25)')
  });
  test('Parses canonicalized string', () => {
    const d = Doubloon.parse('WyJVU0QiLCIyLjI1Il0=');
    expect(d.toString()).to.be.eql('Doubloon<USD>(2.25)')
  });
  test('Throws on object without canonical', () => {
    expect(() => Doubloon.parse({ })).to.throw();
  });

  test('Early quantizing works with custom rounding.', () => {
    const d = new Doubloon<USD>(USD, new Decimal('2.25'));
    const dd = d.div(2);
    const floor = dd.quantize(Decimal.ROUND_FLOOR).str();
    const ceil = dd.quantize(Decimal.ROUND_CEIL).str();
    expect(floor).to.be.eq('1.12');
    expect(ceil).to.be.eq('1.13');
  })

  test('Cross-deserialization works from .NET sample', () => {
    const p = Doubloon.parse('WyJVU0QiLCIyLjI1Il0=');
    expect(p.currency.name).to.be.eq('USD');
    expect(p.str()).to.be.eq('2.25');
  });

  test('Cross-deserialization works from .NET sample', () => {
    const p = Doubloon.parse('WyJVU0QiLCIyLjI1Il0=');
    expect(p.currency.name).to.be.eq('USD');
    expect(p.str()).to.be.eq('2.25');
  });
});
