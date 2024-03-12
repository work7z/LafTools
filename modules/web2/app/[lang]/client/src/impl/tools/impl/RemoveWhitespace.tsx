import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/RemoveWhitespace.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "56iah1S9Y",
        "Removes whitespace from the beginning and end of a text."
      ),
    }
  }
  getOperations(): Operation[] {
    return (
      [
        new fn(),
      ]
    )
  }
}