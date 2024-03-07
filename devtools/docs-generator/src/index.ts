import fs from "fs";
import path from "path";

export type FileInfo = {
  root: boolean;
  fileName: string;
  comments: string;
  destinations: string[];
};

let markdownFiles: FileInfo[] = [
  {
    root: true,
    fileName: "README.md",
    comments: "This is the main file",
    destinations: ["/docs"],
  },
];

export default markdownFiles;
