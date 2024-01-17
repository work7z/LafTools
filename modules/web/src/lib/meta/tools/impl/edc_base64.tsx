import { Dot } from "../../../../utils/TranslationUtils";
import Operation from "../../../core/Operation.mjs";
import FromBase64 from "../../../core/impl/FromBase64.mjs";
import ToBase64 from "../../../core/impl/ToBase64.mjs";
import { AppHandler, ToolMetaInfo } from "../handler";

export default class Base64Handler extends AppHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            description: Dot(
                "0Ceru",
                "Base64 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers.",
            ),
            infoURL: 'https://wikipedia.org/wiki/Base64'
        }
    }
    getOperations(): Operation[] {
        return [
            new FromBase64(),
            new ToBase64(),
        ]
    }
}