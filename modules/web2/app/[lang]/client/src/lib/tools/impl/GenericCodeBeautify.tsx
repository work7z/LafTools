import { Dot } from "../../../utils/TranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/GenericCodeBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: (Dot(
                "rub76Z8zx",
                "Attempts to pretty print C-style languages such as C, C++, C#, Java, PHP, JavaScript etc. This will not do a perfect job, and the resulting code may not work any more. This operation is designed purely to make obfuscated or minified code more easy to read and understand. Things which will not work properly: For loop formatting, Do-While loop formatting, Switch/Case indentation, Certain bit shift operators",
            )),
            infoURL: // program history on wiki
                "https://en.wikipedia.org/wiki/Computer_programming",
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