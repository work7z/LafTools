
export type PopularLanguages = "JavaScript" | "Python" | "Java" | "C#" | "C++" | "TypeScript" | "PHP" | "Swift" | "Kotlin" | "Go" | "Ruby" | "Rust" | "C" | "Scala" | "Shell";

export type CodeImplDetail = {
    template: string,
    howToRunItTips: string
}

export type CodeImplMap = {
    [key in PopularLanguages]: CodeImplDetail
}