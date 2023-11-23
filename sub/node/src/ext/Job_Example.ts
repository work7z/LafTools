import { NodeReq, NodeRes, SubExtCategory } from "../all-types";

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
