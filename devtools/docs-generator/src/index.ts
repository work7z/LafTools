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
  {
    root: false,
    fileName: "CONTRIBUTION.md",
    comments: "This is the contribution file",
    destinations: ["/docs"],
  },
  {
    root: false,
    fileName: "FAQ.md",
    comments: "This is the FAQ file",
    destinations: ["/docs"],
  },
  {
    root: false,
    fileName: "CHANGELOG.md",
    comments: "This is the CHANGELOG file",
    destinations: ["/docs"],
  },
];

export default markdownFiles;
