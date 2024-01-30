import { loadDOT } from "../../../reducers/systemSlice";
import { Dot } from "../../../utils/TranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./SQLBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("C8airO3gW")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}