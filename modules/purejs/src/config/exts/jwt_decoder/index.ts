import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "jwt_decoder.text",
      Tooltip: Dot("xP56jwt_decoderK", "Click to process your data"),
      Label: Dot("xIPjwt_decoder", "Get jwt_decoder"),
      CallFuncList: Dot("xjwt_decoder.ConvertText"),
    },
  ],
  Info: {
    Id: "jwt_decoder",
    Label: Dot("x41ejwt_decoder", "jwt_decoder"),
    Description: Dot("6wjwt_decoder", "TBC"),
  },
};

export default v;
