
date: 22-May-2024
status: #status/unprocessed 
type: #type/doc 
area: #area/cultivation #area/tech 
keyword: #keyword/zig 

---

# What the heck is Zig?

Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software.


## What does it look like?

```zig
// here is a hello world program in Zig

const std = @import("std"); 

pub fn main() void {
  std.debug.print("Hello, world!\n", .{}); 
}
```


## Why Zig?

Well zig sits somewhere in between C and Rust. It's a system level programming language that aims to make low level simpler. (well not so much if you're coming from a js eco-system like me 😆)
