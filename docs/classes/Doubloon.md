[**doubloons**](../README.md)

***

[doubloons](../globals.md) / Doubloon

# Class: Doubloon\<T\>

Defined in: [Doubloon.ts:10](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L10)

## Type Parameters

### T

`T` *extends* [`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)

## Constructors

### new Doubloon()

> **new Doubloon**\<`T`\>(`currency`, `value`, `sigil`?): `Doubloon`\<`T`\>

Defined in: [Doubloon.ts:23](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L23)

Instantiate a monetary value in a given currency.

#### Parameters

##### currency

[`CurrencyType`](../doubloons/namespaces/currencies/type-aliases/CurrencyType.md)\<`T`\>

the currency this doubloon represents

##### value

a base10 decimal value or equivalent string with the proper number of decimal places for the give currency

`string` | `Decimal`

##### sigil?

`symbol`

internal use, it allows for maintaining precision while doing long calculations. Ignore.

#### Returns

`Doubloon`\<`T`\>

## Properties

### currency

> `readonly` **currency**: `T`

Defined in: [Doubloon.ts:14](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L14)

## Methods

### add()

> **add**(`value`): `Doubloon`\<`T`\>

Defined in: [Doubloon.ts:44](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L44)

Add to another doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

the value to add to this doubloon

#### Returns

`Doubloon`\<`T`\>

a new doubloon with the sum total of this doubloon and the other doubloon

***

### div()

> **div**(`value`): `Doubloon`\<`T`\>

Defined in: [Doubloon.ts:101](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L101)

Divide this doubloon by a scalar value.

#### Parameters

##### value

the divisor

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

- a new doubloon with the divided value

***

### eq()

> **eq**(`value`): `boolean`

Defined in: [Doubloon.ts:128](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L128)

Check if another doubloon instance is equal to this one.

#### Parameters

##### value

`Doubloon`\<`T`\>

another doubloon to check equality with

#### Returns

`boolean`

- true if the other doubloon has the same numerical value and is of the same currency

***

### format()

> **format**(): `string`

Defined in: [Doubloon.ts:210](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L210)

Produces a formatted string representation of the monetary value that this
doubloon represents that is useful for display purposes - that is, it includes
the currency symbol in the correct location, and potentially commas or other
symbols as needed.

#### Returns

`string`

- a display-formatted string representation of the value stored in this doubloon

***

### gt()

> **gt**(`value`): `boolean`

Defined in: [Doubloon.ts:142](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L142)

Check if this doubloon has a value greater than another doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

doubloon compare with

#### Returns

`boolean`

if our value exceeds theirs

***

### gte()

> **gte**(`value`): `boolean`

Defined in: [Doubloon.ts:156](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L156)

Check if this doubloon has a value greater than or equal to another doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

another doubloon compare with

#### Returns

`boolean`

true if our value exceeds or matches theirs

***

### lt()

> **lt**(`value`): `boolean`

Defined in: [Doubloon.ts:170](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L170)

Check if this doubloon has a value less than another doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

another doubloon compare with

#### Returns

`boolean`

if our value preceeds theirs

***

### lte()

> **lte**(`value`): `boolean`

Defined in: [Doubloon.ts:184](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L184)

Check if this doubloon has a value less than or equal to another doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

another doubloon compare with

#### Returns

`boolean`

true if our value preceeds or matches theirs

***

### mul()

> **mul**(`value`): `Doubloon`\<`T`\>

Defined in: [Doubloon.ts:74](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L74)

Multiply this doubloon by a scalar (i.e. non-Doubloon) value.
For precision reasons, it must either be an integer number,
or a full-on Decimal.js instance.

#### Parameters

##### value

the scalar to multiply by

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

a new doubloon with the multiplied value

***

### str()

> **str**(): `string`

Defined in: [Doubloon.ts:199](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L199)

Extracts the value out of this doubloon in string form, quantized (i.e. rounded)
according to the currency's requirements. Note however that no currency symbol is
included in this method - for display-worthy strings, use the [Doubloon#format](#format) meethod.

#### Returns

`string`

a string representation of the value stored in this doubloon

***

### sub()

> **sub**(`value`): `Doubloon`\<`T`\>

Defined in: [Doubloon.ts:58](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L58)

Subtract from this doubloon

#### Parameters

##### value

`Doubloon`\<`T`\>

a value to substract from this doubloon

#### Returns

`Doubloon`\<`T`\>

a new doubloon with the subtracted value

***

### toJSON()

> **toJSON**(): [`DoubloonToJSON`](../type-aliases/DoubloonToJSON.md)

Defined in: [Doubloon.ts:226](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L226)

Serialize this doubloon into the proper format for transmission over the wire to another
doubloon-aware service.

#### Returns

[`DoubloonToJSON`](../type-aliases/DoubloonToJSON.md)

a JSON object that should be treated opaquely

***

### toString()

> **toString**(): `string`

Defined in: [Doubloon.ts:218](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L218)

Produces a developer-formatted representation of this doubloon instance
to identify this value in the Chrome dev tools or other debugging environments.

#### Returns

`string`

a developer-oriented string formatting of this doubloon

***

### parse()

> `static` **parse**(`json`): `Doubloon`\<[`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)\>

Defined in: [Doubloon.ts:240](https://github.com/HitchPin/doubloon-ts/blob/5c0f29ae5f1feb0c01b6a69dd7c9f1ae85119d16/src/Doubloon.ts#L240)

Parses a JSON serialized doubloon back into a doubloon type of unknown currency.

#### Parameters

##### json

the object or string to parse

`string` | `object`

#### Returns

`Doubloon`\<[`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)\>

the doubloon in some currency
