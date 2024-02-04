
import { Dot } from "../../../utils/TranslationUtils";
import Operation from "../../core/Operation.tsx";
import FromBCD from "./conversion/FromBCD.js";
import TOBCD from "./conversion/ToBCD.js";
import { ToolHandler, ToolMetaInfo } from "../handler";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "6cOPZ",
                "Binary-Coded Decimal (BCD) is a class of binary encodings of decimal numbers where each decimal digit is represented by a fixed number of bits, usually four or eight. Special bit patterns are sometimes used for a sign"
            ),
            infoURL: 'https://wikipedia.org/wiki/Binary-coded_decimal'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new TOBCD(),
                new FromBCD(),
            ]
        )
    }
}