import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/RemoveLineNumbers.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "3tsHVcKoI",
        "Remove line numbers from the beginning of each line in a text."
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