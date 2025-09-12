[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / CAD

# Class: CAD

Defined in: [currency.ts:141](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L141)

A base currency type that takes care of the most common
needs of all currencies - properly handling rounding to the
correct decimal place, validating significant figures/precision,
and formatting.

## Extends

- [`QuantizedCurrency`](QuantizedCurrency.md)

## Constructors

### new CAD()

> **new CAD**(): `CAD`

Defined in: [currency.ts:142](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L142)

#### Returns

`CAD`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`constructor`](QuantizedCurrency.md#constructor)

## Properties

### name

> `readonly` **name**: `string`

Defined in: [currency.ts:77](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L77)

ISO 4217 Currency Code

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`name`](QuantizedCurrency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: [currency.ts:85](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L85)

Number of decimal places. Usually 2 (for cents).

##### Returns

`number`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`decimalPlaces`](QuantizedCurrency.md#decimalplaces)

## Methods

### format()

> **format**(`value`): `string`

Defined in: [currency.ts:146](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L146)

Format with appropriate symbol. For display only.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`format`](QuantizedCurrency.md#format)

***

### intlFormat()

> **intlFormat**(`value`): `string`

Defined in: [currency.ts:150](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L150)

Format as an international currency value using the default locale for the currency in use.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`intlFormat`](QuantizedCurrency.md#intlformat)

***

### quantize()

> **quantize**(`value`, `rounding`?): `Decimal`

Defined in: [currency.ts:90](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L90)

Quantize to the correct decimal places. Only for internal use.

#### Parameters

##### value

`Decimal`

##### rounding?

`Rounding`

#### Returns

`Decimal`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`quantize`](QuantizedCurrency.md#quantize)

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: [currency.ts:97](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L97)

A function that gets a decimal value from a decimal or string.

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Throws

when string or decimal has excessive decimal digits. Round it first!

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`toDecimal`](QuantizedCurrency.md#todecimal)
