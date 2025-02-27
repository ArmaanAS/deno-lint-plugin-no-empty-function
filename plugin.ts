/** Deno lint plugin that disallows empty function bodies. */
const plugin: Deno.lint.Plugin = {
  name: "no-empty-function-rule",
  rules: {
    "no-empty-function": {
      create(context) {
        function containsComment(node: Deno.lint.BlockStatement): boolean {
          const text = context.sourceCode.getText(node);

          return text.includes("/*") || text.includes("//");
        }
        return {
          ":not([kind=get], [kind=set]) > :not(:not(FunctionDeclaration, FunctionExpression, ArrowFunctionExpression)) > BlockStatement[body.length=0]"(
            node,
          ) {
            if (containsComment(node)) return;
            context.report({
              node,
              message: "Empty function body",
              hint: "Add code or comment to the empty function body",
            });
          },
        };
      },
    },
  },
};

export default plugin;
