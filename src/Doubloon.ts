import { Decimal } from 'decimal.js';
import type { Currency } from './Currency.js';

type CurrencyConstructor<T extends Currency> = new () => T;

export class Doubloon<T extends Currency> {
  static readonly #BypassPrecisioinSigil: unique symbol =
    Symbol('BypassPrecision');
  readonly #currencyCls: CurrencyConstructor<T>;
  readonly currency: T;
  readonly #value: Decimal;

  constructor(
    currency: CurrencyConstructor<T>,
    value: string | Decimal,
    sigil?: symbol,
  ) {
    this.#currencyCls = currency;
    this.currency = new currency();
    if (value instanceof Decimal && sigil === Doubloon.#BypassPrecisioinSigil) {
      this.#value = value;
    } else if (typeof value === 'string' || value instanceof Decimal) {
      this.#value = this.currency.toDecimal(value);
    } else {
      throw new Error('You must provide either a decimal or a string.');
    }
  }

  add(value: Doubloon<T>): Doubloon<T> {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only add a doubloon of the same currency.');
    }
    return new Doubloon(this.#currencyCls, this.#value.plus(value.#value));
  }
  sub(value: Doubloon<T>): Doubloon<T> {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only subtract a doubloon of the same currency.');
    }
    return new Doubloon(this.#currencyCls, this.#value.sub(value.#value));
  }
  mul(value: number | Decimal): Doubloon<T> {
    let newValue: Decimal;
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        throw new Error(
          'If multiplying a doubloon by a "number" (vs a Decimal), it must be an integer.',
        );
      }
      newValue = this.#value.mul(value);
    } else if (value instanceof Decimal) {
      newValue = this.#value.mul(value);
    } else {
      throw new Error(
        'You can only multiply a doubloon with a scalar int or Decimal.',
      );
    }
    return new Doubloon(
      this.#currencyCls,
      newValue,
      Doubloon.#BypassPrecisioinSigil,
    );
  }
  div(value: number | Decimal): Doubloon<T> {
    let newValue: Decimal;
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        throw new Error(
          'If dividing a doubloon by a "number" (vs a Decimal), it must be an integer.',
        );
      }
      newValue = this.#value.div(value);
    } else if (value instanceof Decimal) {
      newValue = this.#value.div(value);
    } else {
      throw new Error(
        'You can only divide a doubloon with a scalar int or Decimal.',
      );
    }
    return new Doubloon(
      this.#currencyCls,
      newValue,
      Doubloon.#BypassPrecisioinSigil,
    );
  }
  eq(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.eq(value.#value);
  }
  gt(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.gt(value.#value);
  }
  gte(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.gte(value.#value);
  }
  lt(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.lt(value.#value);
  }
  lte(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.lte(value.#value);
  }
  str(): string {
    const currencySigFig = this.currency.quantize(this.#value);
    return currencySigFig.toFixed(this.currency.decimalPlaces).toString();
  }
  toString() {
    return `Doubloon<${this.currency.name}>(${this.str()})`;
  }
}
