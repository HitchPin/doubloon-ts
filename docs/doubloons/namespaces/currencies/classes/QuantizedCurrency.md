[**doubloons**](../../../../README.md)

***

[doubloons](../../../../globals.md) / [currencies](../README.md) / QuantizedCurrency

# Class: `abstract` QuantizedCurrency

Defined in: Currency.ts:32

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

Defined in: Currency.ts:37

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

Defined in: Currency.ts:35

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`name`](../interfaces/Currency.md#name)

## Accessors

### decimalPlaces

#### Get Signature

> **get** **decimalPlaces**(): `number`

Defined in: Currency.ts:42

##### Returns

`number`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`decimalPlaces`](../interfaces/Currency.md#decimalplaces)

## Methods

### format()

> `abstract` **format**(`value`): `string`

Defined in: Currency.ts:69

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

Defined in: Currency.ts:46

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

Defined in: Currency.ts:49

#### Parameters

##### value

`string` | `Decimal`

#### Returns

`Decimal`

#### Implementation of

[`Currency`](../interfaces/Currency.md).[`toDecimal`](../interfaces/Currency.md#todecimal)
