[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / QuantizedCurrency

# Class: `abstract` QuantizedCurrency

Defined in: [Currency.ts:73](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L73)

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

Defined in: [Currency.ts:77](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L77)

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

Defined in: [Currency.ts:75](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L75)

ISO 4217 Currency Code

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`name`](../interfaces/Currency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: [Currency.ts:83](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L83)

Number of decimal places. Usually 2 (for cents).

##### Returns

`number`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`decimalPlaces`](../interfaces/Currency.md#decimalplaces)

## Methods

### format()

> `abstract` **format**(`value`): `string`

Defined in: [Currency.ts:113](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L113)

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

> **quantize**(`value`): `Decimal`

Defined in: [Currency.ts:88](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L88)

Quantize to the correct decimal places. Only for internal use.

#### Parameters

##### value

`Decimal`

#### Returns

`Decimal`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`quantize`](../interfaces/Currency.md#quantize)

***

### toDecimal()

> **toDecimal**(`value`): `Decimal`

Defined in: [Currency.ts:92](https://github.com/HitchPin/doubloon-ts/blob/91f6609a5a8923d23e36344e8d52b02c66edfe37/src/Currency.ts#L92)

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
