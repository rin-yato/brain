import { visit } from "unist-util-visit";

export function remarkObsidianImg() {
  return (tree, file) => {
    visit(tree, "text", (node) => {

      const matches = node.value?.match(/!\[\[(.*\..*)\]\]/);
      if (!matches?.[0]) {
        return;
      }
      const imageSrc = matches[1];
      node.type = "image";
      node.url = getPath(
        // absolutePrefix,
        // relativePathResolver,
        // { filePath: file.history[0], cwd: file.cwd },
        imageSrc,
      );
      node.alt = imageSrc;
    });
  };
}

function getPath(imageSrc) {
  return `@/assets/${imageSrc.toLowerCase().replace(/ /g, "-")}`;
}
