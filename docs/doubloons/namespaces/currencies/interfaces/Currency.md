[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / Currency

# Interface: Currency

Defined in: Currency.ts:4

## Properties

### name

> `readonly` **name**: `string`

Defined in: Currency.ts:5

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: Currency.ts:6

##### Returns

`number`

## Methods

### format()

> **format**(`value`): `string`

Defined in: Currency.ts:9

#### Parameters

##### value

`Decimal`

#### Returns

`string`

***

### quantize()

> **quantize**(`value`): `Decimal`

Defined in: Currency.ts:8

#### Parameters

##### value

`Decimal`

#### Returns

`Decimal`

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: Currency.ts:7

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`
