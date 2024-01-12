import { visit } from "unist-util-visit";

export const rehypeCheckbox = () => (tree) =>
  visit(tree, (node) => {
    if (
      node.type === "element" &&
      node.properties &&
      node.properties.disabled
    ) {
      node.properties.disabled = false;
      node.properties.class = "pointer-events-none";
    }
  });
