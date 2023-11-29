import type {
  ToolCategory as ToolCategory,
  NodeReq,
  NodeRes,
  FlushIdValuePair,
} from "../all-types";
import { Dot } from "../utils/translation";

let value: ToolCategory[] = [
  {
    Id: "all", // should have no all in this field
    // Label: Dot("M6MrW", "Good"),
    Label: Dot("cPS6q", "All Tools"),
    SubCategories: [],
  },
  {
    Id: "codec",
    Label: Dot("m0105", "Codec"),
    SubCategories: [
      {
        Id: "codec.Digest_Algorithm",
        Label: Dot("y_BN6", "Digest Algorithm"),
        Icon: "segmented-control",
        ChildrenIdSet: [
          "md2",
          "md4",
          "md5",
          "sha1",
          "sha224",
          "sha256",
          "sha384",
          "sha512",
        ],
      },
      {
        Id: "codec.Encode_and_Decode",
        Label: Dot("y_2Q1", "Encode and Decode"),
        Icon: "widget-button",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Symmetric_Crypto",
        Label: Dot("y_2Q2", "Symmetric Crypto"),
        Icon: "exchange",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Asymmetric_Crypto",
        Label: Dot("y_2Q3", "Asymmetric Crypto"),
        Icon: "exchange",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.SM_Algorithm",
        Label: Dot("y_2Q4", "China National Algorithms"),
        Icon: "lock",
        ChildrenIdSet: [],
      },
      {
        Id: "codec.Web_Auth",
        Label: Dot("y_2Q5", "Web Auth"),
        Icon: "shield",
        ChildrenIdSet: [],
      },
    ],
  },
  { Id: "convertor", Label: Dot("m0106", "Converter"), SubCategories: [] },
  { Id: "generator", Label: Dot("m0107", "Generator"), SubCategories: [] },
  { Id: "formatter", Label: Dot("m0108", "Formatter"), SubCategories: [] },
  { Id: "docs", Label: Dot("m0109", "Docs Center"), SubCategories: [] },
];

export default value;
