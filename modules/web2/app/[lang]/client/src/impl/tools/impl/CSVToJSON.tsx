import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/CSVToJSON.tsx";
import { ToolHandler, ToolMetaInfo } from "../r_handler.tsx";

export default class MeHandler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "kz7jdyWRq",
                "Converts Comma-Separated Values (CSV) to JavaScript Object Notation (JSON) format."
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