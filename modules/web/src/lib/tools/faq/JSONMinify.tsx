import { loadDOT } from "../../../reducers/systemSlice";
import { Dot } from "../../../utils/TranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./JSONBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("mvsT7ts_V")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}