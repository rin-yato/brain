import type { TreeNode } from "./types";

export function buildTree(filePaths: string[]): TreeNode[] {
  const rootNodes: TreeNode[] = [];

  filePaths.forEach((filePath) => {
    const pathSegments = filePath.split("/");
    let currentNodes = rootNodes;
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `${segment}/`;

      let nextNode = currentNodes.find((node) => node.name === segment);

      if (!nextNode) {
        nextNode = { name: segment, path: currentPath };

        if (index === pathSegments.length - 1) {
          // Leaf node (file), no need for children array
          currentNodes.push(nextNode);
        } else {
          // Non-leaf node (directory), create children array
          nextNode.children = [];
          currentNodes.push(nextNode);
        }
      }

      currentNodes = nextNode.children || [];
    });
  });

  return rootNodes;
}
