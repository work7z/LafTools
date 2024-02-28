
import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.tsx";
import hashfn from "./conversion/MD6.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "EEQkeW",
                "The MD6 (Message-Digest 6) algorithm is a cryptographic hash function. It uses a Merkle tree-like structure to allow for immense parallel computation of hashes for very long inputs."
            ),
            infoURL: "https://wikipedia.org/wiki/MD6"
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