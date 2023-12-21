import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "jwt_decoder.text",
      Tooltip: Dot("P56jwt_decoderK", "Click to process your data"),
      Label: Dot("IPjwt_decoder", "Get jwt_decoder"),
      CallFuncList: Dot("jwt_decoder.ConvertText"),
    },
  ],
  Info: {
    Id: "jwt_decoder",
    Label: Dot("41ejwt_decoder", "jwt_decoder"),
    Description: Dot(
      "6wjwt_decoder",
      "TBC"
    ),
  },
};

export default v;
