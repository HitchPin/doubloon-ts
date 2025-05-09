[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / QuantizedCurrency

# Class: `abstract` QuantizedCurrency

Defined in: [currency.ts:73](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L73)

A base currency type that takes care of the most common
needs of all currencies - properly handling rounding to the
correct decimal place, validating significant figures/precision,
and formatting.

## Extended by

- [`USD`](USD.md)
- [`CAD`](CAD.md)
- [`EUR`](EUR.md)
- [`CVE`](CVE.md)

## Implements

- [`Currency`](../interfaces/Currency.md)

## Constructors

### new QuantizedCurrency()

> **new QuantizedCurrency**(`name`, `precision`): `QuantizedCurrency`

Defined in: [currency.ts:77](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L77)

#### Parameters

##### name

`string`

##### precision

`number`

#### Returns

`QuantizedCurrency`

## Properties

### name

> `readonly` **name**: `string`

Defined in: [currency.ts:75](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L75)

ISO 4217 Currency Code

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`name`](../interfaces/Currency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: [currency.ts:83](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L83)

Number of decimal places. Usually 2 (for cents).

##### Returns

`number`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`decimalPlaces`](../interfaces/Currency.md#decimalplaces)

## Methods

### format()

> `abstract` **format**(`value`): `string`

Defined in: [currency.ts:116](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L116)

Format with appropriate symbol. For display only.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`format`](../interfaces/Currency.md#format)

***

### quantize()

> **quantize**(`value`, `rounding`?): `Decimal`

Defined in: [currency.ts:88](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L88)

Quantize to the correct decimal places. Only for internal use.

#### Parameters

##### value

`Decimal`

##### rounding?

`Rounding`

#### Returns

`Decimal`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`quantize`](../interfaces/Currency.md#quantize)

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: [currency.ts:95](https://github.com/HitchPin/doubloon-ts/blob/d49b165a826cc7fe919f1929c5f92a4cf52ed6f4/src/currency.ts#L95)

A function that gets a decimal value from a decimal or string.

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Throws

when string or decimal has excessive decimal digits. Round it first!

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`toDecimal`](../interfaces/Currency.md#todecimal)
