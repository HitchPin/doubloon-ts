[**doubloons**](../README.md)

***

[doubloons](../globals.md) / Doubloon

# Class: Doubloon\<T\>

Defined in: Doubloon.ts:10

## Type Parameters

### T

`T` *extends* [`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)

## Constructors

### new Doubloon()

> **new Doubloon**\<`T`\>(`currency`, `value`, `sigil`?): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:17

#### Parameters

##### currency

[`CurrencyType`](../doubloons/namespaces/currencies/type-aliases/CurrencyType.md)\<`T`\>

##### value

`string` | `Decimal`

##### sigil?

`symbol`

#### Returns

`Doubloon`\<`T`\>

## Properties

### currency

> `readonly` **currency**: `T`

Defined in: Doubloon.ts:14

## Methods

### add()

> **add**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:33

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`Doubloon`\<`T`\>

***

### div()

> **div**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:73

#### Parameters

##### value

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

***

### eq()

> **eq**(`value`): `boolean`

Defined in: Doubloon.ts:95

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### format()

> **format**(): `string`

Defined in: Doubloon.ts:144

#### Returns

`string`

***

### gt()

> **gt**(`value`): `boolean`

Defined in: Doubloon.ts:104

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### gte()

> **gte**(`value`): `boolean`

Defined in: Doubloon.ts:113

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### lt()

> **lt**(`value`): `boolean`

Defined in: Doubloon.ts:122

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### lte()

> **lte**(`value`): `boolean`

Defined in: Doubloon.ts:131

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### mul()

> **mul**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:51

#### Parameters

##### value

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

***

### str()

> **str**(): `string`

Defined in: Doubloon.ts:140

#### Returns

`string`

***

### sub()

> **sub**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:42

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`Doubloon`\<`T`\>

***

### toJSON()

> **toJSON**(): [`DoubloonToJSON`](../type-aliases/DoubloonToJSON.md)

Defined in: Doubloon.ts:150

#### Returns

[`DoubloonToJSON`](../type-aliases/DoubloonToJSON.md)

***

### toString()

> **toString**(): `string`

Defined in: Doubloon.ts:147

#### Returns

`string`

***

### parse()

> `static` **parse**(`json`): `Doubloon`\<[`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)\>

Defined in: Doubloon.ts:159

#### Parameters

##### json

`string` | `object`

#### Returns

`Doubloon`\<[`Currency`](../doubloons/namespaces/currencies/interfaces/Currency.md)\>
