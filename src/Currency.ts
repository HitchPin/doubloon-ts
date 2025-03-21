import { Decimal } from 'decimal.js';

export interface Currency {
  readonly name: string;
  get decimalPlaces(): number;
  toDecimal(value: Decimal | string): Decimal;
  quantize(value: Decimal): Decimal;
  format(value: Decimal): string;
}

export type CurrencyType<T extends Currency> = new (
  ...parameters: unknown[]
) => T;

export class Registry {
  readonly #registry = new Map<string, CurrencyType<Currency>>();

  register(name: string): ClassDecorator {
    return (target) => {
      this.#registry.set(name, target as unknown as CurrencyType<Currency>);
      return target;
    };
  }
  byName(name: string): CurrencyType<Currency> {
    if (!this.#registry.has(name)) {
      throw new Error(`Currency type '${name}' not found.`);
    }
    return this.#registry.get(name)!;
  }
}
export const registry = new Registry();

export abstract class QuantizedCurrency implements Currency {
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
  abstract format(value: Decimal): string;
}

@registry.register('USD')
export class USD extends QuantizedCurrency {
  constructor() {
    super('USD', 2);
  }
  format(value: Decimal): string {
    return `$${this.quantize(value).toFixed(2)}`;
  }
}
@registry.register('CAD')
export class CAD extends QuantizedCurrency {
  constructor() {
    super('CAD', 2);
  }
  format(value: Decimal): string {
    return `$${this.quantize(value).toFixed(2)}`;
  }
}

@registry.register('EUR')
export class EUR extends QuantizedCurrency {
  constructor() {
    super('EUR', 2);
  }
  format(value: Decimal): string {
    return `${this.quantize(value).toFixed(2)}€`;
  }
}

@registry.register('CVE')
export class CVE extends QuantizedCurrency {
  constructor() {
    super('EUR', 2);
  }
  format(value: Decimal): string {
    const amount = this.quantize(value).toFixed(2);
    const amountParts = amount.split('.');
    return amountParts[0] + '$' + amountParts[1];
  }
}
