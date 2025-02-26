// deno-lint-ignore-file no-unused-vars

function foo() {}

const bar = function () {};

const bar1 = () => {};

function* baz() {}

const bar2 = function* () {};

const obj = {
  foo: function () {},

  foo1: function* () {},

  foo2() {},

  *foo3() {},

  get foo4() {},

  set foo4(_) {},

  foo5() {/* Valid */},
};

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

  foo6() {/* Valid */}
}

function doingSomething() {
  return "node".split("").sort().join("");
}

function foo2() {/* Valid */}

const foo3 = function () {/** Valid */};

const foo4 = () => {/* Valid */};

function foo5() {
  // Valid
}
