[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / Currency

# Interface: Currency

Defined in: [currency.ts:8](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L8)

Represents a type of world currency. Different currencies are considered
different types that are in no way compatible with each other and should
disallow mathematical operations at the type level and at runtime.

## Properties

### name

> `readonly` **name**: `string`

Defined in: [currency.ts:10](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L10)

ISO 4217 Currency Code

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: [currency.ts:12](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L12)

Number of decimal places. Usually 2 (for cents).

##### Returns

`number`

## Methods

### format()

> **format**(`value`): `string`

Defined in: [currency.ts:21](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L21)

Format with appropriate symbol. For display only.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

***

### intlFormat()

> **intlFormat**(`value`): `string`

Defined in: [currency.ts:23](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L23)

Format as an international currency value using the default locale for the currency in use.

#### Parameters

##### value

`Decimal`

#### Returns

`string`

***

### quantize()

> **quantize**(`value`, `roundingMode`?): `Decimal`

Defined in: [currency.ts:19](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L19)

Quantize to the correct decimal places. Only for internal use.

#### Parameters

##### value

`Decimal`

##### roundingMode?

`Rounding`

#### Returns

`Decimal`

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: [currency.ts:17](https://github.com/HitchPin/doubloon-ts/blob/189095028324f1b91553de105a1d18d7e4d63f6f/src/currency.ts#L17)

A function that gets a decimal value from a decimal or string.

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Throws

when string or decimal has excessive decimal digits. Round it first!
