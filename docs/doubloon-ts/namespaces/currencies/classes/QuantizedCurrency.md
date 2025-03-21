[**doubloon-ts**](../../../../README.md)

***

[doubloon-ts](../../../../globals.md) / [currencies](../README.md) / QuantizedCurrency

# Class: QuantizedCurrency

Defined in: Currency.ts:10

## Extended by

- [`USD`](USD.md)
- [`CAD`](CAD.md)

## Implements

- [`Currency`](../../../../interfaces/Currency.md)

## Constructors

### new QuantizedCurrency()

> **new QuantizedCurrency**(`name`, `precision`): `QuantizedCurrency`

Defined in: Currency.ts:15

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

Defined in: Currency.ts:13

#### Implementation of

[`Currency`](../../../../interfaces/Currency.md).[`name`](../../../../interfaces/Currency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: Currency.ts:20

##### Returns

`number`

#### Implementation of

[`Currency`](../../../../interfaces/Currency.md).[`decimalPlaces`](../../../../interfaces/Currency.md#decimalplaces)

## Methods

### quantize()

> **quantize**(`value`): `Decimal`

Defined in: Currency.ts:24

#### Parameters

##### value

`Decimal`

#### Returns

`Decimal`

#### Implementation of

[`Currency`](../../../../interfaces/Currency.md).[`quantize`](../../../../interfaces/Currency.md#quantize)

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: Currency.ts:27

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Implementation of

[`Currency`](../../../../interfaces/Currency.md).[`toDecimal`](../../../../interfaces/Currency.md#todecimal)
