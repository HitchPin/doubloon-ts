[**doubloon-ts**](../README.md)

***

[doubloon-ts](../globals.md) / Doubloon

# Class: Doubloon\<T\>

Defined in: Doubloon.ts:6

## Type Parameters

### T

`T` *extends* [`Currency`](../interfaces/Currency.md)

## Constructors

### new Doubloon()

> **new Doubloon**\<`T`\>(`currency`, `value`, `sigil`?): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:13

#### Parameters

##### currency

`CurrencyConstructor`\<`T`\>

##### value

`string` | `Decimal`

##### sigil?

`symbol`

#### Returns

`Doubloon`\<`T`\>

## Properties

### currency

> `readonly` **currency**: `T`

Defined in: Doubloon.ts:10

## Methods

### add()

> **add**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:29

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`Doubloon`\<`T`\>

***

### div()

> **div**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:69

#### Parameters

##### value

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

***

### eq()

> **eq**(`value`): `boolean`

Defined in: Doubloon.ts:91

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### gt()

> **gt**(`value`): `boolean`

Defined in: Doubloon.ts:100

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### gte()

> **gte**(`value`): `boolean`

Defined in: Doubloon.ts:109

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### lt()

> **lt**(`value`): `boolean`

Defined in: Doubloon.ts:118

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### lte()

> **lte**(`value`): `boolean`

Defined in: Doubloon.ts:127

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`boolean`

***

### mul()

> **mul**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:47

#### Parameters

##### value

`number` | `Decimal`

#### Returns

`Doubloon`\<`T`\>

***

### str()

> **str**(): `string`

Defined in: Doubloon.ts:136

#### Returns

`string`

***

### sub()

> **sub**(`value`): `Doubloon`\<`T`\>

Defined in: Doubloon.ts:38

#### Parameters

##### value

`Doubloon`\<`T`\>

#### Returns

`Doubloon`\<`T`\>

***

### toString()

> **toString**(): `string`

Defined in: Doubloon.ts:140

#### Returns

`string`
