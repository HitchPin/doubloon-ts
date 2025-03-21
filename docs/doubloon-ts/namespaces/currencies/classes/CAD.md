[**doubloon-ts**](../../../../README.md)

***

[doubloon-ts](../../../../globals.md) / [currencies](../README.md) / CAD

# Class: CAD

Defined in: Currency.ts:54

## Extends

- [`QuantizedCurrency`](QuantizedCurrency.md)

## Constructors

### new CAD()

> **new CAD**(): `CAD`

Defined in: Currency.ts:55

#### Returns

`CAD`

#### Overrides

[`QuantizedCurrency`](QuantizedCurrency.md).[`constructor`](QuantizedCurrency.md#constructor)

## Properties

### name

> `readonly` **name**: `string`

Defined in: Currency.ts:13

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`name`](QuantizedCurrency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: Currency.ts:20

##### Returns

`number`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`decimalPlaces`](QuantizedCurrency.md#decimalplaces)

## Methods

### quantize()

> **quantize**(`value`): `Decimal`

Defined in: Currency.ts:24

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

Defined in: Currency.ts:27

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Inherited from

[`QuantizedCurrency`](QuantizedCurrency.md).[`toDecimal`](QuantizedCurrency.md#todecimal)
