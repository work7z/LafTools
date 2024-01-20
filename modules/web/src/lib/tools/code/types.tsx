import { LabelValuePair } from "../../../types/constants";

export type PopularLanguages = "node.js" | "Python" | "Java" | "C#" | "C++" | "PHP" | "Go" | "Rust" | "C";


export const program_languages: LabelValuePair[] = [
    { label: "Node.js", value: "node.js" },
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "C#", value: "C#" },
    { label: "C++", value: "C++" },
    { label: "PHP", value: "PHP" },
    { label: "Go", value: "Go" },
    { label: "Rust", value: "Rust" },
    { label: "C", value: "C" },
];
export type CodeImplDetail = {
    template: string,
    howToRunItTips: JSX.Element
}

export type CodeImplMap = {
    [key in PopularLanguages]: CodeImplDetail
}