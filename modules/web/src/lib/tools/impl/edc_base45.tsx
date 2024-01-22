
import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.mjs";
import FromBase45 from "./conversion/FromBase45.tsx";
import ToBase45 from "./conversion/ToBase45.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "ciZV21",
                "Base45 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. The high number base results in shorter strings than with the decimal or hexadecimal system. Base45 is optimized for usage with QR codes.",
            ),
            infoURL: 'https://wikipedia.org/wiki/List_of_numeral_systems'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new ToBase45(),
                new FromBase45(),
            ]
        )
    }
}