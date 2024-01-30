import { loadDOT } from "../../../reducers/systemSlice";
import { Dot } from "../../../utils/TranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./XMLBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("Wa61-ZCLs")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}