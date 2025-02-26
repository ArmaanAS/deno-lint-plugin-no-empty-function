/** Deno lint plugin that disallows empty function bodies. */
const plugin: Deno.lint.Plugin = {
  name: "no-empty-function-rule",
  rules: {
    "no-empty-function": {
      create(context) {
        function isBodyEmpty(body: Deno.lint.BlockStatement | null): boolean {
          return !!body && body.type === "BlockStatement" &&
            body.body.length === 0;
        }
        function isInXetter(node: Deno.lint.FunctionExpression): boolean {
          const ancestors = context.sourceCode.getAncestors(node);
          if (ancestors.length > 0) {
            const parent = ancestors[ancestors.length - 1];
            if (
              (parent.type === "Property" ||
                parent.type === "MethodDefinition") &&
              (parent.kind === "set" || parent.kind === "get")
            ) {
              return true;
            }
          }
          return false;
        }
        function containsComment(node: Deno.lint.BlockStatement): boolean {
          const text = context.sourceCode.text.slice(
            node.range[0],
            node.range[1],
          );

          return text.includes("/*") || text.includes("//");
        }
        return {
          FunctionDeclaration(node) {
            if (isBodyEmpty(node.body) && !containsComment(node.body!)) {
              context.report({
                node: node.body!,
                message: "Empty function body",
                hint: "Add code or comment to the empty function body",
              });
            }
          },
          FunctionExpression(node) {
            if (isInXetter(node)) return;
            if (isBodyEmpty(node.body) && !containsComment(node.body!)) {
              context.report({
                node: node.body,
                message: "Empty function body",
                hint: "Add code or comment to the empty function body",
              });
            }
          },
          ArrowFunctionExpression(node) {
            if (
              node.body &&
              node.body.type === "BlockStatement" &&
              node.body.body.length === 0 &&
              !containsComment(node.body)
            ) {
              context.report({
                node: node.body,
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
