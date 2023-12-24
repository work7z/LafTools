import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "jwt_encoder.text",
      Tooltip: Dot("P56jwt_encoderK", "Click to process your data"),
      Label: Dot("IPjwt_encoder", "Get jwt_encoder"),
      CallFuncList: Dot("jwt_encoder.ConvertText"),
    },
  ],
  Info: {
    Id: "jwt_encoder",
    Label: Dot("41ejwt_encoder", "jwt_encoder"),
    Description: Dot(
      "6wjwt_encoder",
      "TBC"
    ),
  },
};

export default v;
