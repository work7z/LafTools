// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
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

import { Dot } from "../../utils/TranslationUtils";
import { EachLang, FileValueMatcher } from "../purejs-types";

let langList: EachLang[] = [
  { Label: Dot("f7akol", "English"), LabelByLang: "English", Value: "en_US" },
  {
    Label: Dot("spdh98", "Simplified Chinese"),
    LabelByLang: "简体中文",
    Value: "zh_CN",
  },
  {
    Label: Dot("7dm0d8", "Traditional Chinese"),
    LabelByLang: "繁體中文",
    Value: "zh_HK",
  },
  { Label: Dot("aj3nhd", "German"), LabelByLang: "Deutsch", Value: "de" },
  { Label: Dot("d5x1rl", "Spanish"), Value: "es", LabelByLang: "Español" },
  { Label: Dot("o1umzi", "French"), Value: "fr", LabelByLang: "Français" },
  { Label: Dot("1jj0ri", "Japanese"), Value: "ja", LabelByLang: "日本語" },
  { Label: Dot("5ggegx", "Korean"), Value: "ko", LabelByLang: "한국어" },
  { Label: Dot("vci8rd", "Dutch"), Value: "nl", LabelByLang: "Nederlands" },
  { Label: Dot("2ybu7j", "Norwegian"), Value: "no", LabelByLang: "Norsk" },
  { Label: Dot("w92j07", "Russian"), Value: "ru", LabelByLang: "Русский" },
  { Label: Dot("2tib5m", "Swedish"), Value: "sv", LabelByLang: "Svenska" },
  { Label: Dot("ykganl", "Danish"), Value: "da", LabelByLang: "Dansk" },
  { Label: Dot("9tbbkt", "Finnish"), Value: "fi", LabelByLang: "Suomi" },
  { Label: Dot("vrfjnf", "Italian"), Value: "it", LabelByLang: "Italiano" },
  { Label: Dot("n94an4", "Polish"), Value: "pl", LabelByLang: "Polski" },
  {
    Label: Dot("n24tes", "Portuguese (Brazil)"),
    Value: "pt",
    LabelByLang: "Português (Brasil)",
  },
  { Label: Dot("a4jbpq", "Czech"), Value: "cs", LabelByLang: "Čeština" },
  { Label: Dot("ediql2", "Hungarian"), Value: "hu", LabelByLang: "Magyar" },
  { Label: Dot("2lhcqwp", "Turkish"), Value: "tr", LabelByLang: "Türkçe" },
  {
    Label: Dot("2lhqqwp", "Indonesian"),
    Value: "id",
    LabelByLang: "Bahasa Indonesia",
  },
  {
    Label: Dot("2lehqwp", "Vietnamese"),
    Value: "vi",
    LabelByLang: "Tiếng Việt",
  },
  { Label: Dot("2lhqwwp", "Thai"), Value: "th", LabelByLang: "ภาษาไทย" },
  {
    Label: Dot("2lhqqwqp", "Malay"),
    Value: "ms",
    LabelByLang: "Bahasa Melayu",
  },
].map((x: EachLang) => {
  x.LabelInEnglish = x.Label[1];
  return x;
});

let value: FileValueMatcher[] = [
  {
    Name: "app-i18n.json",
    Value: langList,
  },
];
export default value;
