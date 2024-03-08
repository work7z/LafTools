import { Dot } from "@/app/[lang]/client/src/utils//cTranslationUtils.tsx";
import Operation from "../../core/Operation.tsx";
import fn from "./conversion/JavaScriptMinify.tsx";
import { ToolHandler, ToolMetaInfo } from "../types/handler.tsx";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            hideCodePanel: true,
            exampleType: "js-short",
            description: Dot(
                "bsWpBA73s",
                "Compresses JavaScript code.",
            ),
            infoURL: "https://en.wikipedia.org/wiki/JavaScript",
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