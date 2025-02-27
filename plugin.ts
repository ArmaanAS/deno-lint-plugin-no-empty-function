/** Deno lint plugin that disallows empty function bodies. */
const plugin: Deno.lint.Plugin = {
  name: "no-empty-function-rule",
  rules: {
    "no-empty-function": {
      create(context) {
        function containsComment(node: Deno.lint.BlockStatement): boolean {
          const text = context.sourceCode.text.slice(
            node.range[0],
            node.range[1],
          );

          return text.includes("/*") || text.includes("//");
        }
        return {
          "FunctionDeclaration > BlockStatement[body.length=0], :not(MethodDefinition[kind='get'], MethodDefinition[kind='set'], Property[kind='get'], Property[kind='set']) > FunctionExpression > BlockStatement[body.length=0], ArrowFunctionExpression > BlockStatement[body.length=0]"(
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
