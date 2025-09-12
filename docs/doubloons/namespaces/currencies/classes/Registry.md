[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / Registry

# Class: Registry

Defined in: [currency.ts:36](https://github.com/HitchPin/doubloon-ts/blob/a08a6f3bd7c5f91e0bd31b2fbd311c11214101aa/src/currency.ts#L36)

For JSON deserialization of unknown currencies, we need a registry
of all the known currencies. A singleton instance of the registry
class does the trick.

## Constructors

### new Registry()

> **new Registry**(): `Registry`

#### Returns

`Registry`

## Methods

### byName()

> **byName**(`name`): [`CurrencyType`](../type-aliases/CurrencyType.md)\<[`Currency`](../interfaces/Currency.md)\>

Defined in: [currency.ts:56](https://github.com/HitchPin/doubloon-ts/blob/a08a6f3bd7c5f91e0bd31b2fbd311c11214101aa/src/currency.ts#L56)

Lookup a currency type by name.

#### Parameters

##### name

`string`

the 3-character ISO 4217 currency code

#### Returns

[`CurrencyType`](../type-aliases/CurrencyType.md)\<[`Currency`](../interfaces/Currency.md)\>

a generic constructor producing the requested currency.

***

### register()

> **register**(`name`): `ClassDecorator`

Defined in: [currency.ts:44](https://github.com/HitchPin/doubloon-ts/blob/a08a6f3bd7c5f91e0bd31b2fbd311c11214101aa/src/currency.ts#L44)

Register a currency class for availability in JSON deserialization.

#### Parameters

##### name

`string`

the 3-character ISO 4217 currency code

#### Returns

`ClassDecorator`

ClassDecorator a decorator for easy registration of new currencies
