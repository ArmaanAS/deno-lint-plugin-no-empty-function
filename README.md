# no-empty-function-plugin

A Deno lint plugin that disallows empty function bodies.

## Rule Details

This rule flags any function declarations, function expressions, or arrow functions that have empty bodies. Empty function bodies often indicate incomplete implementations or dead code.

## Installation

```json
// deno.json
{
  "lint": {
    "plugins": [
      "jsr:@armaanas/no-empty-function@0.1.0"
    ]
  }
}
```

## ❌ Invalid Examples

```js
function foo() {}

const bar = function*() {};

const baz = () => {}; 
```

## ✅ Valid Examples

```js
function foo() {
  return true;
}

const bar = function() {
  return "node".split("").sort().join("");
};

const baz = () => 42; // Arrow function with expression body

// Setters are allowed to be empty
class Example {
  constructor() {
    this.foo = 3.14;
  }
}
```
