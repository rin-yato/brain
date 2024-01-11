import * as fs from "fs/promises";
import path from "path";

const privateFolders = ["08 Me", "07 Journals", "05 Workspaces"];
const exclude = [
  ".git",
  ".obsidian",
  ".obsidian.vimrc",
  ".DS_Store",
  ...privateFolders,
];

async function main() {
  const obsidianPath = path.join(
    process.env.HOME ?? "",
    "Documents",
    "obsidian",
  );
  const contentPath = path.join(process.cwd(), "src", "content", "obsidian");

  try {
    // Clear out the blogs folder
    await fs.rm(contentPath, { recursive: true, force: true });

    // Copy all files and folders except specified exclusions to src/content/blogs
    await fs.cp(obsidianPath, contentPath, {
      recursive: true,
      force: true,
      filter: (src) => !exclude.includes(path.basename(src)),
    });

    // Rename all files and directories to follow URL-friendly format
    await renameFilesAndDirectories(contentPath);
  } catch (error) {
    if (error instanceof Error)
      return console.error(`Error during main process: ${error.message}`);
    console.error(error);
  }
}

async function getAllPaths(
  dirPath: string,
  filterFn: (src: string) => boolean,
) {
  const allPaths: string[] = [];

  const processPath = async (filePath: string) => {
    const isDirectory = (await fs.stat(filePath)).isDirectory();

    if (isDirectory) {
      const newFilePath = path.join(
        path.dirname(filePath),
        path.basename(filePath).toLowerCase().replace(/ /g, "-"),
      );
      await fs.rename(filePath, newFilePath);

      const nestedPaths = await fs.readdir(newFilePath);
      for (const nestedPath of nestedPaths) {
        await processPath(path.join(newFilePath, nestedPath));
      }
    } else {
      if (filterFn(filePath)) {
        allPaths.push(filePath);
      }
    }
  };

  await processPath(dirPath);
  console.log(allPaths);
  return allPaths;
}

async function renameFilesAndDirectories(basePath: string) {
  const filterFunction = (src: string) => !exclude.includes(path.basename(src));

  try {
    const allPaths = await getAllPaths(basePath, filterFunction);

    for (const filePath of allPaths) {
      const fileName = path.basename(filePath);
      const newFileName = fileName.toLowerCase().replace(/ /g, "-");

      const newPath = path.join(path.dirname(filePath), newFileName);
      await fs.rename(filePath, newPath);
    }
  } catch (error) {
    if (error instanceof Error)
      return console.error(`Error during renaming process: ${error.message}`);
    console.error(error);
  }
}

// Call the main function
await main();
