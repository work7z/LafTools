import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/CSSMinify.tsx";
import { ToolHandler, ToolMetaInfo } from "../handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "css-short",
            description: Dot(
                "htTmvWjsS",
                "Compresses Cascading Style Sheets (CSS) code."
            ),
            infoURL: // css wiki
                "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
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