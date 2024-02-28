import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/JavaScriptBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "js-short",
            description: Dot(
                "IxAJswoSh",
                "Parses and pretty prints valid JavaScript code. Also works with JavaScript Object Notation (JSON).",
            ),
            infoURL: "https://en.wikipedia.org/wiki/JavaScript",
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