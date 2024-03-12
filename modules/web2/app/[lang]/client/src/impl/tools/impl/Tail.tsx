import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/Tail.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "aVjps8d6V",
        "Displays the last part of a file or text."
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