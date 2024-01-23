
import { Dot } from "../../../utils/TranslationUtils.js";
import Operation from "../../core/Operation.mjs";
import md5 from "./conversion/MD5.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.js";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "0MOjj",
                "MD5 (Message-Digest 5) is a widely used hash function. It has been used in a variety of security applications and is also commonly used to check the integrity of files. However, MD5 is not collision resistant and it isn't suitable for applications like SSL/TLS certificates or digital signatures that rely on this property."
            ),
            infoURL: 'https://wikipedia.org/wiki/MD5'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new md5(),
            ]
        )
    }
}