/** Deno lint plugin that disallows empty function bodies. */
const plugin: Deno.lint.Plugin = {
  name: "my-empty-function-rule",
  rules: {
    "no-empty-function": {
      create(context) {
        function isBodyEmpty(body: Deno.lint.BlockStatement | null): boolean {
          return !!body && body.type === "BlockStatement" && body.body.length === 0;
        }
        return {
          FunctionDeclaration(node) {
            if (isBodyEmpty(node.body)) {
              context.report({
                node,
                message: "Empty function body",
                hint: "Add code or comment to the empty function body",
              });
            }
          },
          FunctionExpression(node) {
            if (isBodyEmpty(node.body)) {
              context.report({
                node,
                message: "Empty function body",
                hint: "Add code or comment to the empty function body",
              });
            }
          },
          ArrowFunctionExpression(node) {
            if (
              node.body &&
              node.body.type === "BlockStatement" &&
              node.body.body.length === 0
            ) {
              context.report({
                node,
                message: "Empty arrow function body",
                hint: "Add code or comment to the empty arrow function body",
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;
