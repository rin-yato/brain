import { toString } from "mdast-util-to-string";

export function remarkDescription() {
  // use the first paragraph as the description
  return function (tree, { data }) {
    const description = tree.children.find(
      (node, index) => node.type === "paragraph" && index !== 0,
    );

    if (description) {
      data.astro.frontmatter.description = toString(description);
    } else {
      data.astro.frontmatter.description = "";
    }
  };
}
