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

import i18nItems, { I18nItem } from "@/app/__CORE__/config/i18n";
import { Dot } from "../../utils/cTranslationUtils";
import { EachLang, FileValueMatcher } from "../purejs-types";
export default (): EachLang[] => {
  let langList: EachLang[] = i18nItems.map((x: I18nItem) => {
    return {
      LabelInEnglish: x.LabelInEnglish,
      Label: x.Label[1] + "",
      LabelByLang: x.LabelByLang,
      Value: x.Value
    } satisfies EachLang
    // x.LabelInEnglish = x.Label[1];
    // return x;
  });

  return langList;
}
