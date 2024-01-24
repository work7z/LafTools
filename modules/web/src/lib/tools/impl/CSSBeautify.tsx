import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.mjs";
import fn from "./conversion/CSSBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            outputLang: "css",
            exampleType: "css-short",
            description: Dot(
                "FYRoL",
                "Indents and prettifies Cascading Style Sheets (CSS) code.",
            ),
            infoURL: "https://developer.mozilla.org/en-US/docs/Web/CSS",
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