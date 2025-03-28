import { Decimal } from 'decimal.js';

/**
 * Represents a type of world currency. Different currencies are considered
 * different types that are in no way compatible with each other and should
 * disallow mathematical operations at the type level and at runtime.
 */
export interface Currency {
  /** ISO 4217 Currency Code */
  readonly name: string;
  /** Number of decimal places. Usually 2 (for cents). */
  get decimalPlaces(): number;
  /**
   * A function that gets a decimal value from a decimal or string.
   * @throws when string or decimal has excessive decimal digits. Round it first!
   */
  toDecimal(value: Decimal | string): Decimal;
  /** Quantize to the correct decimal places. Only for internal use. */
  quantize(value: Decimal): Decimal;
  /** Format with appropriate symbol. For display only. */
  format(value: Decimal): string;
}

/** Represents a constructor that produces a currency instance. */
export type CurrencyType<T extends Currency> = new (
  ...parameters: unknown[]
) => T;

/**
 * For JSON deserialization of unknown currencies, we need a registry
 * of all the known currencies. A singleton instance of the registry
 * class does the trick.
 */
export class Registry {
  readonly #registry = new Map<string, CurrencyType<Currency>>();

  /**
   * Register a currency class for availability in JSON deserialization.
   * @param {string} name - the 3-character ISO 4217 currency code
   * @returns {Function} ClassDecorator a decorator for easy registration of new currencies
   */
  register(name: string): ClassDecorator {
    return (target) => {
      this.#registry.set(name, target as unknown as CurrencyType<Currency>);
      return target;
    };
  }

  /**
   * Lookup a currency type by name.
   * @param {string} name - the 3-character ISO 4217 currency code
   * @returns {CurrencyType<Currency>} a generic constructor producing the requested currency.
   */
  byName(name: string): CurrencyType<Currency> {
    if (!this.#registry.has(name)) {
      throw new Error(`Currency type '${name}' not found.`);
    }
    return this.#registry.get(name)!;
  }
}

/**
 * The singleton registry instance.
 */
export const registry = new Registry();

/**
 * A base currency type that takes care of the most common
 * needs of all currencies - properly handling rounding to the
 * correct decimal place, validating significant figures/precision,
 * and formatting.
 */
export abstract class QuantizedCurrency implements Currency {
  #precision: number;
  readonly name: string;

  constructor(name: string, precision: number) {
    this.name = name;
    this.#precision = precision;
  }

  /** @inheritdoc */
  get decimalPlaces(): number {
    return this.#precision;
  }

  /** @inheritdoc */
  quantize(value: Decimal): Decimal {
    return value.toDecimalPlaces(this.#precision, Decimal.ROUND_HALF_EVEN);
  }
  /** @inheritdoc */
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
  /** @inheritdoc */
  abstract format(value: Decimal): string;
}

@registry.register('USD')
export class USD extends QuantizedCurrency {
  constructor() {
    super('USD', 2);
  }
  /** @inheritdoc */
  format(value: Decimal): string {
    return `$${this.quantize(value).toFixed(2)}`;
  }
}
@registry.register('CAD')
export class CAD extends QuantizedCurrency {
  constructor() {
    super('CAD', 2);
  }
  /** @inheritdoc */
  format(value: Decimal): string {
    return `$${this.quantize(value).toFixed(2)}`;
  }
}

@registry.register('EUR')
export class EUR extends QuantizedCurrency {
  constructor() {
    super('EUR', 2);
  }
  /** @inheritdoc */
  format(value: Decimal): string {
    return `${this.quantize(value).toFixed(2)}€`;
  }
}

@registry.register('CVE')
export class CVE extends QuantizedCurrency {
  constructor() {
    super('CVE', 2);
  }
  /** @inheritdoc */
  format(value: Decimal): string {
    const amount = this.quantize(value).toFixed(2);
    const amountParts = amount.split('.');
    return amountParts[0] + '$' + amountParts[1];
  }
}
