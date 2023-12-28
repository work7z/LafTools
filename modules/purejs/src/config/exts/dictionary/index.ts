import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "dictionary.text",
      Tooltip: Dot("xP56dictionaryK", "Click to process your data"),
      Label: Dot("xIPdictionary", "Get dictionary"),
      CallFuncList: Dot("xdictionary.ConvertText"),
    },
  ],
  Info: {
    Id: "dictionary",
    Label: Dot("x41edictionary", "dictionary"),
    Description: Dot("6wdictionary", "TBC"),
  },
};

export default v;
