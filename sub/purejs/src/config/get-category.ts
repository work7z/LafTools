import type {
  ToolCategory,
  NodeReq,
  NodeRes,
  FlushIdValuePair,
} from "../types/all-types";
import { Dot } from "../utils/translation";

let value: ToolCategory[] = [
  {
    Id: "all", // should have no all in this field
    Label: ["cPS6q", "All Tools"],
    SubCategories: [],
  },
  {
    Id: "codec",
    Label: ["m0105", "Codec"],
    SubCategories: [
      {
        Id: "codec.Digest_Algorithm",
        Label: ["y_BN6", "Digest Algorithm"],
        Icon: "segmented-control",
        ChildrenIdSet: ["md5", "sha1", "sha256", "sha512"],
      },
      {
        Id: "codec.Encode_and_Decode",
        Label: ["y_2Q1", "Encode and Decode"],
        Icon: "widget-button",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Symmetric_Crypto",
        Label: ["y_2Q2", "Symmetric Crypto"],
        Icon: "exchange",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Asymmetric_Crypto",
        Label: ["y_2Q3", "Asymmetric Crypto"],
        Icon: "exchange",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.SM_Algorithm",
        Label: ["y_2Q4", "China National Algorithms"],
        Icon: "lock",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Web_Auth",
        Label: ["y_2Q5", "Web Auth"],
        Icon: "shield",
        ChildrenIdSet: [],
      },
    ],
  },
  { Id: "convertor", Label: ["m0106", "Converter"], SubCategories: [] },
  { Id: "generator", Label: ["m0107", "Generator"], SubCategories: [] },
  { Id: "formatter", Label: ["m0108", "Formatter"], SubCategories: [] },
  { Id: "docs", Label: ["m0109", "Docs Center"], SubCategories: [] },
];

export default value;
