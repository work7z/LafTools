
import { Dot } from "../../../utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import hashfn from "./conversion/MD2.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "rYSpwq",
                "The MD2 (Message-Digest 2) algorithm is a cryptographic hash function developed by Ronald Rivest in 1989. The algorithm is optimized for 8-bit computers.Although MD2 is no longer considered secure, even as of 2014, it remains in use in public key infrastructures as part of certificates generated with MD2 and RSA. The message digest algorithm consists, by default, of 18 rounds.",
            ),
            infoURL: "https://wikipedia.org/wiki/MD2_(cryptography)"
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