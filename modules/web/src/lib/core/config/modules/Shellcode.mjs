/**
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2023
* @license Apache-2.0
*/
import DisassembleX86 from "../../operations/DisassembleX86.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Shellcode = {
    "Disassemble x86": DisassembleX86,
};

export default OpModules;
