import type {
  ToolCategory as ToolCategory,
  NodeReq,
  NodeRes,
  FlushIdValuePair,
} from "../purejs-types";
import { Dot } from "../utils/translation";
import _ from "lodash";

let value: ToolCategory[] = [
  {
    Id: "all", // should have no all in this field
    // Label: Dot("M6MrW", "Good"), 
    // Dot("dkjk12","this is test")
    Label: Dot("cPS6q", "All Tools"),
    SubCategories: [],
  },
  {
    Id: "codec",
    Label: Dot("ks12d", "Cyber Security"),
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
    Id: "converter",
    Label: Dot("m0106", "Converter"),
    SubCategories: [
      {
        Id: "command_parser",
        Label: Dot("ui5pZ", "Command Parser"),
        Icon: "hat",
        ChildrenIdSet: [
          "curl_to_pl",
          "curl_to_api",
          //
        ],
      },
      {
        Id: "file_tools",
        Label: Dot("gQhfS", "File Tools"),
        Icon: "saved",
        ChildrenIdSet: [
          "correct_file_path",
          "analyze_file_path",
          //
        ],
      },
    ],
  },

  {
    Id: "generater",
    Label: Dot("m0107", "Generater"),
    SubCategories: [
      {
        Id: "code_converter",
        Label: Dot("dCFIwC", "Code Generater"),
        Icon: "array-boolean",
        ChildrenIdSet: [
          "gen_yaml_to_json",
          "gen_sql_to_json",
          "gen_dml_to_json",
        ],
      },
      {
        Id: "data_converter",
        Label: Dot("aSOpr", "Data Model Generater"),
        Icon: "array-boolean",
        ChildrenIdSet: [
          "json_to_model",
          "xml_to_model",
          "sql_to_model",
          //
        ],
      },
      {
        Id: "text_random",
        Label: Dot("unc9E", "Random Text"),
        Icon: "random",
        ChildrenIdSet: [
          "rand_uuid",
          "rand_mock",
          "rand_plaintext",
          "rand_sundrytext",
          "rand_loremipsum",
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
    Id: "translater",
    Label: Dot("-Yo129I", "Text Tools"),
    SubCategories: [
      {
        Id: "quick_diff",
        Label: Dot("yfYeg", "Quick Differenciate"),
        Icon: "search-text",
        ChildrenIdSet: [
          "text_compare",
          "file_compare",
          //
        ],
      },
      {
        Id: "general",
        Label: Dot("y_2Q5dqw", "Translation"),
        Icon: "translate",
        ChildrenIdSet: [
          "dictionary",
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
      {
        Id: "text_matcher",
        Label: Dot("y_2Q5dqw", "Text Matcher"),
        Icon: "oil-field",
        ChildrenIdSet: [
          "regex_tester",
          //
        ],
      },
      {
        Id: "text_template",
        Label: Dot("yfYeg", "Text Template"),
        Icon: "oil-field",
        ChildrenIdSet: [
          "template_dotjs",
          "template_handlebars",
          //
        ],
      },
    ],
  },
  {
    Id: "network_tools",
    Label: Dot("dGVUB", "Network Tools"),
    SubCategories: [
      {
        Id: "ip_tools",
        Label: Dot("a3z-3k12", "IP Address Tools"),
        Icon: "ip-address",
        ChildrenIdSet: [
          "ipv4_masker",
          "ipv4_to_long",
          "ipv4_utility",
          "ipv4_network_calculater",
          "ipv4_address_converter",
          "subnet_mask_tools", // include multiple tools
          "nodes_host_calculater",
        ],
      },
    ],
  },
];

_.forEach(value, (x) => {
  // calculate its total count
  let totalCount = 0;
  _.forEach(x.SubCategories, (sub) => {
    _.forEach(sub.ChildrenIdSet, (x) => {
      totalCount++;
    });
  });
  x.TotalCount = totalCount;
});
value[0].TotalCount = _.sumBy(value, (x) => x.TotalCount || 0);

export default value;
