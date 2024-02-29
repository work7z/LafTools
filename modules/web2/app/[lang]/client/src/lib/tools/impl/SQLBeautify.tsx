import { Dot } from "../../../utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/SQLBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "cMBqyyFae",
                "Indents and prettifies Structured Query Language (SQL) code."
            ),
            infoURL: "https://en.wikipedia.org/wiki/SQL"
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