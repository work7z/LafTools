import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "dictionary.text",
      Tooltip: Dot("P56dictionaryK", "Click to process your data"),
      Label: Dot("IPdictionary", "Get dictionary"),
      CallFuncList: Dot("dictionary.ConvertText"),
    },
  ],
  Info: {
    Id: "dictionary",
    Label: Dot("41edictionary", "dictionary"),
    Description: Dot(
      "6wdictionary",
      "TBC"
    ),
  },
};

export default v;
