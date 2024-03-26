
date: 26-Mar-2024
status: #status/unprocessed  
type: #type/doc
area: #area/tech #area/cheatsheet
keyword: #keyword/typescript #keyword/utils

---

## Use `interface`

Yes! Try to use interface whenever it is possible. Why?
Cause, interface is faster than type. When you have complex type with generic all over the place, your lsp would start slowing down. 


## Use explicit return type

By explicitly telling typescript what the function returns, typescript no longer need to work super hard to infer the return type of your function!


## Okay here are the utils

```ts
/**
 * Prettify your complicated type
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
```

```ts
/**
 * Make some properties of T optional
 *
 * @example
 * type User = {
 *  id: string;
 *  name: string;
 * };
 *
 * type PartialUser = MakeOptional<User, "id" | "name">;
 * // { id: string; name?: string; }
 *
 */
export type MakeOptional<T, K extends keyof T> = Prettify<
  Omit<T, K> & Partial<Pick<T, K>>
>;
```












