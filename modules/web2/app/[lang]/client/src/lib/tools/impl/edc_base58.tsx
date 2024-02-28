
import { Dot } from "../../../utils/TranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import FromBase58 from "./conversion/FromBase58.tsx";
import ToBase58 from "./conversion/ToBase58.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "ciZV2deq1",
                "Base58 (similar to Base64) is a notation for encoding arbitrary byte data. It differs from Base64 by removing easily misread characters (i.e. l, I, 0 and O) to improve human readability. Base58 is commonly used in cryptocurrencies (Bitcoin, Ripple, etc).",
            ),
            infoURL: 'https://wikipedia.org/wiki/Base58'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new ToBase58(),
                new FromBase58(),
            ]
        )
    }
}