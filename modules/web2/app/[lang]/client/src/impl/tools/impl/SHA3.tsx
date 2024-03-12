import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/SHA3.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
  getMetaInfo(): ToolMetaInfo {
    return {
      hideCodePanel: true,
      description: Dot(
        "N8_QO8jAt",
        "Generates a SHA-3 hash from a text. SHA-3 is the latest member of the Secure Hash Algorithm family. It is not vulnerable to the same types of attacks as SHA-1 and SHA-2."
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