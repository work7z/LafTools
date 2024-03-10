// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

/**
 * THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */
import GeneratePGPKeyPair from "../../operations/GeneratePGPKeyPair.mjs";
import PGPDecrypt from "../../operations/PGPDecrypt.mjs";
import PGPDecryptAndVerify from "../../operations/PGPDecryptAndVerify.mjs";
import PGPEncrypt from "../../operations/PGPEncrypt.mjs";
import PGPEncryptAndSign from "../../operations/PGPEncryptAndSign.mjs";
import PGPVerify from "../../operations/PGPVerify.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.PGP = {
  "Generate PGP Key Pair": GeneratePGPKeyPair,
  "PGP Decrypt": PGPDecrypt,
  "PGP Decrypt and Verify": PGPDecryptAndVerify,
  "PGP Encrypt": PGPEncrypt,
  "PGP Encrypt and Sign": PGPEncryptAndSign,
  "PGP Verify": PGPVerify,
};

export default OpModules;
