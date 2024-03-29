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
 * Imports all modules for builds which do not load modules separately.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */
import CiphersModule from "./Ciphers.mjs";
import DefaultModule from "./Default.js";
import EncodingsModule from "./Encodings.mjs";
import ImageModule from "./Image.mjs";
import CryptoModule from "./Crypto.mjs";
import SerialiseModule from "./Serialise.mjs";
import HashingModule from "./Hashing.mjs";
import BletchleyModule from "./Bletchley.mjs";
import CompressionModule from "./Compression.mjs";
import CodeModule from "./Code.mjs";
import DiffModule from "./Diff.mjs";
import ShellcodeModule from "./Shellcode.mjs";
import ChartsModule from "./Charts.mjs";
import RegexModule from "./Regex.mjs";
import PGPModule from "./PGP.mjs";
import PublicKeyModule from "./PublicKey.mjs";
import OCRModule from "./OCR.mjs";
import URLModule from "./URL.mjs";
import UserAgentModule from "./UserAgent.mjs";
import ProtobufModule from "./Protobuf.mjs";
import YaraModule from "./Yara.mjs";

const OpModules = {};

Object.assign(
  OpModules,
  CiphersModule,
  DefaultModule,
  EncodingsModule,
  ImageModule,
  CryptoModule,
  SerialiseModule,
  HashingModule,
  BletchleyModule,
  CompressionModule,
  CodeModule,
  DiffModule,
  ShellcodeModule,
  ChartsModule,
  RegexModule,
  PGPModule,
  PublicKeyModule,
  OCRModule,
  URLModule,
  UserAgentModule,
  ProtobufModule,
  YaraModule,
);

export default OpModules;
