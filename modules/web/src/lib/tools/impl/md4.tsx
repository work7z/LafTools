
import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.mjs";
import hashfn from "./conversion/MD4.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "yTsFO",
                "The MD4 (Message-Digest 4) algorithm is a cryptographic hash function developed by Ronald Rivest in 1990. The digest length is 128 bits. The algorithm has influenced later designs, such as the MD5, SHA-1 and RIPEMD algorithms.<br><br>The security of MD4 has been severely compromised.",
            ),
            infoURL: "https://wikipedia.org/wiki/MD4"
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new hashfn(),
            ]
        )
    }
}