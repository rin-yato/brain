
date: 22-May-2024
updated: 22-May-2024
status: #status/unprocessed 
type: #type/doc 
area: #area/cultivation #area/tech 
keyword: #keyword/zig 

---

## How do you declare variable in zig?

Well, that's pretty simple. Here's an example:

```zig
const foo: u8 = 1;
var bar: u8 = 2;
```

There are two ways of delaring a variable as you can see

- `const` - for immutable variable or in simple term a variable that cannot be changed
- `var` - for mutable variable or variable that can be changed later on in the program


## Data Type

In this chapter, we'll only talk about simple primitive type. Integer, Boolean, String (maybe)...

**Integer**

The integer type comes in two form `u(n)` and `i(n)`, see the example below:

```zig
// Here we are declaring that foo is an unsigned 8bits integer.
// Unsigned integer can only contains positive number.
// 8 bits is the amount of memory allocated to foo.
const foo: u8 = 3;
const noNegative: u8 = -2; // Error: cannot be negative
const too_big: u8 = 10000; // Error: number too big

// We'll talk more about the bit thingy later.
// Let's see how we can have negative number first.
const negative_foo: i8 = -2; // OK
```

As you can tell, `u(n)` and `i(n)` behave identically, the big difference is that `u(n)` cannot have negative number, while `i(n)` can!!

What about the bit thingy? Well that's the amount of memory allocated for the number. For example 4 bits meaning 4 spots for the binary number 0000.

- 1 → `0001`
- 2 → `0010`
- 3 → `0011`
- 4 → `0100`
- 5 → `0101`
- 6 → `0110`
- 7 → `0111`
- 8 → `1000`
- 9 → `1001`
- 10 → `1010`
- 11 → `1011`
- 12 → `1100`
- 13 → `1101`
- 14 → `1110`
- 15 → `1111`

In this case, a `u4` can only hold number from 0 - 15.






