
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import Operation from "../../core/Operation.tsx";
import FromBase32 from "./conversion/FromBase32";
import ToBase32 from "./conversion/ToBase32";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "ciZV2",
                "Base32 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers. It uses a smaller set of characters than Base64, usually the uppercase alphabet and the numbers 2 to 7.",
            ),
            infoURL: 'https://wikipedia.org/wiki/Base32'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new ToBase32(),
                new FromBase32(),
            ]
        )
    }
}