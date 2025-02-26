import { assertEquals } from "jsr:@std/assert";
import plugin from "./plugin.ts";

// Helper function to run lint tests
function testLint(code: string, expectedDiagnosticsCount: number) {
  const diagnostics = Deno.lint.runPlugin(plugin, "test.ts", code);
  assertEquals(
    diagnostics.length,
    expectedDiagnosticsCount,
    `Expected ${expectedDiagnosticsCount} diagnostics, but got ${diagnostics.length}: ${
      JSON.stringify(diagnostics, null, 2)
    }`,
  );

  if (expectedDiagnosticsCount > 0) {
    diagnostics.forEach((d) => {
      assertEquals(d.id.startsWith("no-empty-function-rule"), true);
    });
  }
}

// Regular empty functions
Deno.test(
  "empty function declaration",
  () => testLint("function foo() {}", 1),
);
Deno.test(
  "empty function expression",
  () => testLint("const bar = function() {};", 1),
);
Deno.test(
  "empty arrow function",
  () => testLint("const bar1 = () => {};", 1),
);
Deno.test(
  "empty generator function declaration",
  () => testLint("function* baz() {}", 1),
);
Deno.test(
  "empty generator function expression",
  () => testLint("const bar2 = function*() {};", 1),
);

// Object methods
Deno.test(
  "empty object method (function expression)",
  () => testLint("const obj = { foo: function() {} };", 1),
);
Deno.test(
  "empty object generator method (function expression)",
  () => testLint("const obj = { foo1: function*() {} };", 1),
);
Deno.test(
  "empty object method (shorthand)",
  () => testLint("const obj = { foo2() {} };", 1),
);
Deno.test(
  "empty object generator method (shorthand)",
  () => testLint("const obj = { *foo3() {} };", 1),
);
Deno.test(
  "object getter method",
  () => testLint("const obj = { get foo4() {} };", 0),
); // Getters are allowed to be empty
Deno.test(
  "object setter method",
  () => testLint("const obj = { set foo4(_) {} };", 0),
); // Setters are allowed to be empty
Deno.test(
  "object method with comment",
  () => testLint("const obj = { foo5() { /* Valid */ } };", 0),
);

// Class methods
Deno.test(
  "empty class constructor",
  () => testLint("class A { constructor() {} }", 1),
);
Deno.test(
  "empty class method",
  () => testLint("class A { foo() {} }", 1),
);
Deno.test(
  "empty class generator method",
  () => testLint("class A { *foo1() {} }", 1),
);
Deno.test(
  "class getter method",
  () => testLint("class A { get foo2() {} }", 0),
); // Getters are allowed to be empty
Deno.test(
  "class setter method",
  () => testLint("class A { set foo2(_) {} }", 0),
); // Setters are allowed to be empty
Deno.test(
  "empty static class method",
  () => testLint("class A { static foo3() {} }", 1),
);
Deno.test(
  "empty static generator method",
  () => testLint("class A { static *foo4() {} }", 1),
);
Deno.test(
  "static getter method",
  () => testLint("class A { static get foo5() {} }", 0),
); // Static getters are allowed to be empty
Deno.test(
  "static setter method",
  () => testLint("class A { static set foo5(_) {} }", 0),
); // Static setters are allowed to be empty
Deno.test(
  "class method with comment",
  () => testLint("class A { foo6() { /* Valid */ } }", 0),
);

// Functions with body/comments
Deno.test(
  "function with body",
  () =>
    testLint(
      'function doingSomething() { return "node".split("").sort().join(""); }',
      0,
    ),
);
Deno.test(
  "function with block comment",
  () => testLint("function foo2() { /* Valid */ }", 0),
);
Deno.test(
  "function expression with block comment",
  () => testLint("const foo3 = function() { /** Valid */ }", 0),
);
Deno.test(
  "arrow function with block comment",
  () => testLint("const foo4 = () => { /* Valid */ };", 0),
);
Deno.test(
  "function with line comment",
  () => testLint("function foo5() { // Valid \n}", 0),
);

// Complete class test
Deno.test(
  "complete class with methods",
  () =>
    testLint(
      `
        class A {
          constructor() {}
          foo() {}
          *foo1() {}
          get foo2() {}
          set foo2(_) {}
          static foo3() {}
          static *foo4() {}
          static get foo5() {}
          static set foo5(_) {}
          foo6() { /* Valid */ }
        }
      `,
      5,
    ),
); // Should detect 5 empty methods (constructor, foo, foo1, static foo3, static foo4)

// Complete object test
Deno.test(
  "complete object with methods",
  () =>
    testLint(
      `
        const obj = {
          foo: function() {},
          foo1: function*() {},
          foo2() {},
          *foo3() {},
          get foo4() {},
          set foo4(_) {},
          foo5() { /* Valid */ }
        };
      `,
      4,
    ),
); // Should detect 4 empty methods (foo, foo1, foo2, foo3)
