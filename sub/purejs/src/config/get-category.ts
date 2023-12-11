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
        ChildrenIdSet: [
          "edc_base64",
          "edc_url",
          "edc_base32",
          "edc_hex",
          "edc_unicode",
          "edc_base64-hex",
          "edc_querystring",
        ],
      },
      {
        Id: "codec.Escape_and_unescape",
        Label: Dot("z1oFn", "Escape and Unescape"),
        Icon: "vertical-inbetween",
        ChildrenIdSet: [
          "esc_xml",
          "esc_html",
          "esc_csv",
          "esc_java_string",
          "esc_json",
          "esc_javascript",
        ],
      },
      {
        Id: "codec.Symmetric_Crypto",
        Label: Dot("y_2Q2", "Symmetric Crypto"),
        Icon: "rect-width",
        ChildrenIdSet: [
          "sym_pbe_md5_des",
          "sym_pbe_sha1_rc2",
          "sym_pbe_sha1_des",
          "sym_rc6",
          "sym_rc4",
          "sym_rc5",
          "sym_rc2",
          "sym_triple_des",
          "sym_blowfish",
          "sym_des",
          "sym_aes",
          "sym_arc4",
          // chacha-20, etc...
        ],
      },
      {
        Id: "codec.Asymmetric_Crypto",
        Label: Dot("y_2Q3", "Asymmetric Crypto"),
        Icon: "inheritance",
        ChildrenIdSet: [
          "asym_rsa",
          //
        ],
      },
      {
        Id: "codec.SM_Algorithm",
        Label: Dot("y_2Q4", "China National Algorithms"),
        Icon: "search-around",
        ChildrenIdSet: [
          "sm2",
          "sm3",
          "sm4",
          //
        ],
      },
      {
        Id: "codec.Web_Auth",
        Label: Dot("y_2Q5", "Web Auth"),
        Icon: "shield",
        ChildrenIdSet: [
          "jwt_encoder",
          "jwt_decoder",
          //
        ],
      },
    ],
  },
  {
    Id: "convertor",
    Label: Dot("m0106", "Converter"),
    SubCategories: [
      //
    ],
  },
  {
    Id: "generator",
    Label: Dot("m0107", "Generator"),
    SubCategories: [
      {
        Id: "code_convertor",
        Label: Dot("dCFIC", "Code Generator"),
        Icon: "array-boolean",
        ChildrenIdSet: [
          "gen_yaml_to_json",
          "gen_sql_to_json",
          "gen_dml_to_json",
        ],
      },
    ],
  },
  {
    Id: "formatter",
    Label: Dot("m0108", "Formatter"),
    SubCategories: [
      {
        Id: "code_prettier",
        Label: Dot("dCFIC", "Code Prettier"),
        Icon: "array-string",
        ChildrenIdSet: [
          "fmt_html",
          "fmt_xml",
          "fmt_yaml",
          "fmt_css",
          "fmt_css",
          "fmt_less",
          "fmt_sass",
          "fmt_json",
          "fmt_markdown",
          "fmt_javascript",
          "fmt_typescript",
          "fmt_sql",
          "fmt_graphql",
        ],
      },
    ],
  },
  {
    Id: "translator",
    Label: Dot("-YoYI", "Translator"),
    SubCategories: [
      {
        Id: "general",
        Label: Dot("y_2Q5dqw", "Translation"),
        Icon: "translate",
        ChildrenIdSet: [
          "translate_json",
          "translate_text",
          "translate_properties",
          "translate_customizer",
        ],
      },
      {
        Id: "ai_posh",
        Label: Dot("Ot6EP", "Polish Tools"),
        Icon: "send-to-graph",
        ChildrenIdSet: [
          "write_by_ai",
          "polish_by_ai",
          "grammer_check",
          //
        ],
      },
    ],
  },
];

export default value;
