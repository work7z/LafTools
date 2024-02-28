import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/JSONMinify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "NrQc8OJfZ",
                "Compresses JavaScript Object Notation (JSON) code."
            ),
            infoURL: "https://www.json.org/json-en.html",
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