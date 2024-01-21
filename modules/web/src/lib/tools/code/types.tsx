import { LabelValuePair } from "../../../types/constants";


// align scope begin
export type PopularLanguages = "node.js" | "python" | "java" | "csharp" | "cpp" | "php" | "go" | "rust" | "c";

export const program_languages: LabelValuePair[] = [
    { label: "Java", value: "java" },
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "PHP", value: "php" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
    { label: "C", value: "c" },
];

// align scope end

export type CodeImplDetail = {
    template: string,
    howToRunItTips: JSX.Element
}

export type CodeImplMap = {
    [key in PopularLanguages]: CodeImplDetail
}