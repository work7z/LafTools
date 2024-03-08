// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 21 Jan 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { LabelValuePair } from "../../../types/constants";


// align scope begin
export type PopularLanguages = "node.js" | "python" | "java" | "csharp" | "cpp" | "php" | "go" | "rust" | "c" | "ruby" | "swift" | "kotlin" | "scala" | "perl";

export const program_languages: LabelValuePair[] = [
    { label: "Java", value: "java" },
    { label: "Node.js", value: "node.js" },
    { label: "Python", value: "python" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "PHP", value: "php" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
    { label: "C", value: "c" },
    { label: "Ruby", value: "ruby" },
    { label: "Swift", value: "swift" },
    { label: "Kotlin", value: "kotlin" },
    { label: "Scala", value: "scala" },
    { label: "Perl", value: "perl" },
]

// align scope end

export type CodeImplDetail = {
    template: string,
    howToRunItTips: JSX.Element
    links?: { link: string, name: string }[]
}

export type CodeImplMap = {
    [key in PopularLanguages]: CodeImplDetail
}