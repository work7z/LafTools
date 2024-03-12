import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/JSONBeautify.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "pzn2IpkDo",
                "Indents and pretty prints JavaScript Object Notation (JSON) code.<br><br>Tags: json viewer, prettify, syntax highlighting",
            ),
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