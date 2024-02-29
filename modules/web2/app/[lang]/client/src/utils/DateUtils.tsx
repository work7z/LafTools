// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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

import { logutils } from "./LogUtils";

import _ from "lodash";
import { Dot } from "./cTranslationUtils";
import moment from "moment";
import { AxiosError } from "axios";

const DateUtils = {
  parseDate(dateString: string, format: string): Date {
    return moment(dateString, format).toDate();
  },

  isSameDay(date1: Date, date2: Date): boolean {
    return moment(date1).isSame(date2, "day");
  },

  isBefore(date1: Date, date2: Date): boolean {
    return moment(date1).isBefore(date2);
  },

  isAfter(date1: Date, date2: Date): boolean {
    return moment(date1).isAfter(date2);
  },
  formatDateTime(time: any): string {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  },
};
export default DateUtils;
