[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / Registry

# Class: Registry

Defined in: [currency.ts:34](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L34)

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

Defined in: [currency.ts:54](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L54)

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

Defined in: [currency.ts:42](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L42)

Register a currency class for availability in JSON deserialization.

#### Parameters

##### name

`string`

the 3-character ISO 4217 currency code

#### Returns

`ClassDecorator`

ClassDecorator a decorator for easy registration of new currencies
