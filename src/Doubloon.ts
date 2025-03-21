import { Decimal } from 'decimal.js';
import { registry, type Currency, type CurrencyType } from './Currency.js';
import { uint8ArrayToBase64, base64ToUint8Array } from './b64/polyfill-core.js';

export type DoubloonToJSON = {
  formatted: string;
  canonical: string;
};

export class Doubloon<T extends Currency> {
  static readonly #BypassPrecisioinSigil: unique symbol =
    Symbol('BypassPrecision');
  readonly #currencyCls: CurrencyType<T>;
  readonly currency: T;
  readonly #value: Decimal;

  constructor(
    currency: CurrencyType<T>,
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
  format(): string {
    return this.currency.format(this.#value);
  }
  toString(): string {
    return `Doubloon<${this.currency.name}>(${this.str()})`;
  }
  toJSON(): DoubloonToJSON {
    const canonical = [this.str(), this.currency.name];
    const json = JSON.stringify(canonical);
    const enc = new TextEncoder().encode(json);
    return {
      canonical: uint8ArrayToBase64(enc),
      formatted: this.currency.format(this.#value),
    };
  }
  static parse(json: object | string): Doubloon<Currency> {
    const decodeFromB64 = (str: string): Doubloon<Currency> => {
      const { arrayBytes } = base64ToUint8Array(str);
      const arrStr = new TextDecoder().decode(arrayBytes);
      const canon = JSON.parse(arrStr) as [string, string];
      const currency = registry.byName(canon[1]);
      const dVal = new Decimal(canon[0]);
      return new Doubloon(currency, dVal);
    };
    let jsonObj: object;
    if (typeof json === 'string') {
      return decodeFromB64(json);
    } else {
      jsonObj = json;
    }
    const canonicalDescriptor = Object.getOwnPropertyDescriptor(
      jsonObj,
      'canonical',
    );
    if (!canonicalDescriptor) {
      throw new Error("Expected object to have 'canonical' property.");
    }
    const canonicalValue = (jsonObj as { canonical: string }).canonical;
    return decodeFromB64(canonicalValue);
  }
}
