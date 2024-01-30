import { loadDOT } from "../../../reducers/systemSlice";
import { Dot } from "../../../utils/TranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./CSSBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("11fVn7pNu")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}