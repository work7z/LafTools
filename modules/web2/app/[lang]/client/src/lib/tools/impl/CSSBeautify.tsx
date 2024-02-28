import { Dot } from "../../../utils/TranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/CSSBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
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