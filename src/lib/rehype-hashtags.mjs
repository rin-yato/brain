import { visit } from "unist-util-visit";

export function rehypeHashtags() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "p") {
        return;
      }

      function processHashtags(text) {
        const hashtags = text.match(/#\w+[-/\w]+/g);

        if (hashtags) {
          const processedChildren = text
            .split(/#\w+[-/\w]+/g)
            .flatMap((part, index) => [
              { type: "text", value: part },
              index > 0 && {
                type: "element",
                tagName: "span",
                properties: { className: "tag" },
                children: [{ type: "text", value: hashtags[index - 1] }],
              },
            ])
            .filter(Boolean);

          return processedChildren;
        }

        return [{ type: "text", value: text }];
      }

      node.children = node.children.flatMap((child) => {
        if (child.type === "text") {
          return processHashtags(child.value);
        }

        return [child];
      });
    });
  };
}
