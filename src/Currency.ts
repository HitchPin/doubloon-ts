import { Decimal } from 'decimal.js';

export interface Currency {
  readonly name: string;
  get decimalPlaces(): number;
  toDecimal(value: Decimal | string): Decimal;
  quantize(value: Decimal): Decimal;
}

export class QuantizedCurrency implements Currency {
  #precision: number;

  readonly name: string;

  constructor(name: string, precision: number) {
    this.name = name;
    this.#precision = precision;
  }

  get decimalPlaces(): number {
    return this.#precision;
  }

  quantize(value: Decimal): Decimal {
    return value.toDecimalPlaces(this.#precision, Decimal.ROUND_HALF_EVEN);
  }
  toDecimal(value: Decimal | string): Decimal {
    const dec = typeof value === 'string' ? new Decimal(value) : value;
    if (!(dec instanceof Decimal)) {
      throw new Error('You must provide either a decimal or a string.');
    }
    if (dec.decimalPlaces() > this.#precision) {
      throw new Error(
        `The value provided has more than ${this.#precision} decimal places.`,
      );
    }
    if (typeof value === 'string' && value.indexOf('.') !== -1) {
      const decPart = value.split('.')[1];
      if (decPart.length > this.#precision) {
        throw new Error(
          `The value provided has more than ${this.#precision} decimal places.`,
        );
      }
    }
    return dec.toDecimalPlaces(this.decimalPlaces);
  }
}

export class USD extends QuantizedCurrency {
  constructor() {
    super('USD', 2);
  }
}
export class CAD extends QuantizedCurrency {
  constructor() {
    super('CAD', 2);
  }
}
