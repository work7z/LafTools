import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "jwt_encoder.text",
      Tooltip: Dot("xP56jwt_encoderK", "Click to process your data"),
      Label: Dot("xIPjwt_encoder", "Get jwt_encoder"),
      CallFuncList: Dot("xjwt_encoder.ConvertText"),
    },
  ],
  Info: {
    Id: "jwt_encoder",
    Label: Dot("x41ejwt_encoder", "jwt_encoder"),
    Description: Dot("6wjwt_encoder", "TBC"),
  },
};

export default v;
