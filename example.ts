// deno-lint-ignore-file no-unused-vars

function foo() {}

const bar = function() {};

const bar1 = () => {};

function* baz() {}

const bar2 = function*() {};

const obj = {
    foo: function() {},

    foo1: function*() {},

    foo2() {},

    *foo3() {},

    get foo4() {},

    set foo4(_) {}
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
}

function doingSomething() {
    return "node".split("").sort().join("");
}