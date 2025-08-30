import { Decimal } from 'decimal.js';
import { registry, type Currency, type CurrencyType } from './currency.js';
import { uint8ArrayToBase64, base64ToUint8Array } from './b64/polyfill-core.js';

export type DoubloonToJSON = {
  displayOnly: string;
  canonical: string;
};

export class Doubloon<T extends Currency> {
  static readonly #BypassPrecisioinSigil: unique symbol =
    Symbol('BypassPrecision');
  readonly #currencyCls: CurrencyType<T>;
  readonly currency: T;
  readonly #value: Decimal;

  /**
   * Instantiate a monetary value in a given currency.
   * @param {CurrencyType<T>} currency - the currency this doubloon represents
   * @param {string | Decimal} value - a base10 decimal value or equivalent string with the proper number of decimal places for the give currency
   * @param {symbol} sigil - internal use, it allows for maintaining precision while doing long calculations. Ignore.
   */
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

  /**
   * Add to another doubloon
   * @param {Doubloon<T>} value - the value to add to this doubloon
   * @returns {Doubloon<T>} a new doubloon with the sum total of this doubloon and the other doubloon
   */
  add(value: Doubloon<T>): Doubloon<T> {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only add a doubloon of the same currency.');
    }
    return new Doubloon(
      this.#currencyCls,
      this.#value.plus(value.#value),
      Doubloon.#BypassPrecisioinSigil,
    );
  }
  /**
   * Subtract from this doubloon
   * @param {Doubloon<T>} value - a value to substract from this doubloon
   * @returns {Doubloon<T>} a new doubloon with the subtracted value
   */
  sub(value: Doubloon<T>): Doubloon<T> {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only subtract a doubloon of the same currency.');
    }
    return new Doubloon(
      this.#currencyCls,
      this.#value.sub(value.#value),
      Doubloon.#BypassPrecisioinSigil,
    );
  }
  /**
   * Multiply this doubloon by a scalar (i.e. non-Doubloon) value.
   * For precision reasons, it must either be an integer number,
   * or a full-on Decimal.js instance.
   * @param {number|Decimal} value - the scalar to multiply by
   * @returns {Doubloon<T>} a new doubloon with the multiplied value
   */
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
  /**
   * Divide this doubloon by a scalar value.
   * @param {number | Decimal} value - the divisor
   * @returns {Doubloon<T>} - a new doubloon with the divided value
   */
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
  /**
   * Check if another doubloon instance is equal to this one.
   * @param {Doubloon<T>} value - another doubloon to check equality with
   * @returns {boolean} - true if the other doubloon has the same numerical value and is of the same currency
   */
  eq(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.eq(value.#value);
  }
  /**
   * Check if this doubloon has a value greater than another doubloon
   * @param {Doubloon<T>} value - doubloon compare with
   * @returns {boolean} if our value exceeds theirs
   */
  gt(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.gt(value.#value);
  }
  /**
   * Check if this doubloon has a value greater than or equal to another doubloon
   * @param {Doubloon<T>} value - another doubloon compare with
   * @returns {boolean} true if our value exceeds or matches theirs
   */
  gte(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.gte(value.#value);
  }
  /**
   * Check if this doubloon has a value less than another doubloon
   * @param {Doubloon<T>} value - another doubloon compare with
   * @returns {boolean} if our value preceeds theirs
   */
  lt(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.lt(value.#value);
  }
  /**
   * Check if this doubloon has a value less than or equal to another doubloon
   * @param {Doubloon<T>} value - another doubloon compare with
   * @returns {boolean} true if our value preceeds or matches theirs
   */
  lte(value: Doubloon<T>): boolean {
    if (
      !(value instanceof Doubloon) ||
      this.#currencyCls !== value.#currencyCls
    ) {
      throw new Error('You can only compare a doubloon of the same currency.');
    }
    return this.#value.lte(value.#value);
  }
  quantize(roundingMode: Decimal.Rounding): Doubloon<T> {
    const qts = this.currency.quantize(this.#value, roundingMode);
    return new Doubloon<T>(this.#currencyCls, qts);
  }
  /**
   * Extracts the value out of this doubloon in string form, quantized (i.e. rounded)
   * according to the currency's requirements. Note however that no currency symbol is
   * included in this method - for display-worthy strings, use the {@link Doubloon#format} meethod.
   * @returns {string} a string representation of the value stored in this doubloon
   */
  str(): string {
    const currencySigFig = this.currency.quantize(this.#value);
    return currencySigFig.toFixed(this.currency.decimalPlaces).toString();
  }
  /**
   * Produces a formatted string representation of the monetary value that this
   * doubloon represents that is useful for display purposes - that is, it includes
   * the currency symbol in the correct location, and potentially commas or other
   * symbols as needed.
   * @returns {string} - a display-formatted string representation of the value stored in this doubloon
   */
  format(): string {
    return this.currency.format(this.#value);
  }
  /**
   * Produces a developer-formatted representation of this doubloon instance
   * to identify this value in the Chrome dev tools or other debugging environments.
   * @returns {string} a developer-oriented string formatting of this doubloon
   */
  toString(): string {
    return `Doubloon<${this.currency.name}>(${this.str()})`;
  }
  /**
   * Serialize this doubloon into the proper format for transmission over the wire to another
   * doubloon-aware service.
   * @returns {DoubloonToJSON} a JSON object that should be treated opaquely
   */
  toJSON(): DoubloonToJSON {
    const canonical = [this.currency.name, this.str()];
    const json = JSON.stringify(canonical);
    const enc = new TextEncoder().encode(json);
    return {
      canonical: uint8ArrayToBase64(enc),
      displayOnly: this.currency.format(this.#value),
    };
  }
  /**
   * Parses a JSON serialized doubloon back into a doubloon type of unknown currency.
   * @param {object | string} json - the object or string to parse
   * @returns {Doubloon<Currency>} the doubloon in some currency
   */
  static parse(json: object | string): Doubloon<Currency> {
    const decodeFromB64 = (str: string): Doubloon<Currency> => {
      const { arrayBytes } = base64ToUint8Array(str);
      const arrStr = new TextDecoder().decode(arrayBytes);
      const canon = JSON.parse(arrStr) as [string, string];
      const currency = registry.byName(canon[0]);
      const dVal = new Decimal(canon[1]);
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
