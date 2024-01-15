/**
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2023
* @license Apache-2.0
*/
import ParseUserAgent from "../../operations/ParseUserAgent.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.UserAgent = {
    "Parse User Agent": ParseUserAgent,
};

export default OpModules;