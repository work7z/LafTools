import fs from "fs";
import path from "path";
import { exit } from "process";
let chokidar = require("chokidar");
import {
  CategoryDefinition,
  JobProcesser,
  NodeReq,
  NodeRes,
  SubExtCategory,
} from "../all-types";
import { Dot_fn } from "../translation";

export default async function (
  req: NodeReq
): Promise<NodeRes<SubExtCategory[]> | null> {
  return {
    Type: req.Type,
    Id: req.Id,
    Lang: req.Lang,
    OutputValue: [],
  };
}
