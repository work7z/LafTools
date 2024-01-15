/**
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2023
* @license Apache-2.0
*/
import Bombe from "../../operations/Bombe.mjs";
import Colossus from "../../operations/Colossus.mjs";
import Enigma from "../../operations/Enigma.mjs";
import Lorenz from "../../operations/Lorenz.mjs";
import MultipleBombe from "../../operations/MultipleBombe.mjs";
import SIGABA from "../../operations/SIGABA.mjs";
import Typex from "../../operations/Typex.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Bletchley = {
    "Bombe": Bombe,
    "Colossus": Colossus,
    "Enigma": Enigma,
    "Lorenz": Lorenz,
    "Multiple Bombe": MultipleBombe,
    "SIGABA": SIGABA,
    "Typex": Typex,
};

export default OpModules;