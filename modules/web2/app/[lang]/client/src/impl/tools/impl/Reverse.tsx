import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/Reverse.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "jIe5giARD",
        "Reverses the order of characters in a text."
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