import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/XMLBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "hX1CWGAhl",
                "Indents and prettifies eXtensible Markup Language (XML) code."
            ),
            infoURL: // link for xml standard
                "https://www.w3.org/TR/xml/"
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