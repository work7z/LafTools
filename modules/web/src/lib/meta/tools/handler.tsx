import Operation from "../../core/Operation.mjs";

export type ToolMetaInfo = {
    description: string;
    infoURL: string;
}

export abstract class AppHandler {
    abstract getMetaInfo(): ToolMetaInfo;
    abstract getOperations(): Operation[];
}
