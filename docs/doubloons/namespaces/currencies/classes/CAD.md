[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / CAD

# Class: CAD

Defined in: currency.ts:127

A base currency type that takes care of the most common
needs of all currencies - properly handling rounding to the
correct decimal place, validating significant figures/precision,
and formatting.

## Extends

- [`QuantizedCurrency`](QuantizedCurrency.md)

## Constructors

### new CAD()

> **new CAD**(): `CAD`

Defined in: currency.ts:128

#### Returns

`CAD`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`constructor`](QuantizedCurrency.md#constructor)

## Properties

### name

> `readonly` **name**: `string`

Defined in: currency.ts:75

ISO 4217 Currency Code

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`name`](QuantizedCurrency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: currency.ts:83

Number of decimal places. Usually 2 (for cents).

##### Returns

`number`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`decimalPlaces`](QuantizedCurrency.md#decimalplaces)

## Methods

### format()

> **format**(`value`): `string`

Defined in: currency.ts:132

Format with appropriate symbol. For display only.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`format`](QuantizedCurrency.md#format)

***

### quantize()

> **quantize**(`value`): `Decimal`

Defined in: currency.ts:88

Quantize to the correct decimal places. Only for internal use.

#### Parameters

##### value

`Decimal`

#### Returns

`Decimal`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`quantize`](QuantizedCurrency.md#quantize)

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: currency.ts:92

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
