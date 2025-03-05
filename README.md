# no-empty-function-plugin

A Deno lint plugin that disallows empty function bodies.

## Rule Details

This rule flags any function declarations, function expressions, or arrow functions that have empty bodies. Empty function bodies often indicate incomplete implementations or dead code.

## Installation

```json
// deno.json
{
  "lint": {
    "plugins": ["jsr:@armaanas/no-empty-function@0.3.0"]
  }
}
```

## ❌ Invalid Examples

```js
function foo() {}

const bar = function* () {};

const baz = () => {};

class Example {
  constructor() {}

  foo() {}
}
```

```txt
error[no-empty-function-rule/no-empty-function]: Empty function body
 --> /home/user/deno/lint/example.ts:1:16
  |
1 | function foo() {}
  |                ^^
  = hint: Add code or comment to the empty function body
```

## ✅ Valid Examples

```js
function foo() {
  return true;
}

const bar = function () {
  return "node".split("").sort().join("");
};

const baz = () => 42;

class Example {
  constructor() {
    this.foo = 3.14;
  }
}

function foo1() {
  /* no-op */
}
```
