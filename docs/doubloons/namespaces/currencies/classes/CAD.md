[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / CAD

# Class: CAD

Defined in: Currency.ts:82

## Extends

- [`QuantizedCurrency`](QuantizedCurrency.md)

## Constructors

### new CAD()

> **new CAD**(): `CAD`

Defined in: Currency.ts:83

#### Returns

`CAD`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`constructor`](QuantizedCurrency.md#constructor)

## Properties

### name

> `readonly` **name**: `string`

Defined in: Currency.ts:35

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`name`](QuantizedCurrency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: Currency.ts:42

##### Returns

`number`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`decimalPlaces`](QuantizedCurrency.md#decimalplaces)

## Methods

### format()

> **format**(`value`): `string`

Defined in: Currency.ts:86

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

Defined in: Currency.ts:46

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

Defined in: Currency.ts:49

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`toDecimal`](QuantizedCurrency.md#todecimal)
