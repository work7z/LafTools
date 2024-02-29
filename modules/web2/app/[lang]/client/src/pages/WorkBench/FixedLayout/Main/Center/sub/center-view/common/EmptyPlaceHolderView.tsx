// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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

import { FN_GetDispatch } from "../../../../../../../../nocycle";

import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import forgeSlice from "../../../../../../../../reducers/forgeSlice";
import { ClosableText } from "../../../../../../../../components/ClosableText";

export type NavSubItem = {
  label: string;
  subLabel?: string;
}

export default (props: {
  extraHelpers: NavSubItem[]
  emptyTitle: string
}) => {
  let helpers: NavSubItem[] = [
    ...props.extraHelpers,
    {
      label: Dot("F0CCF", "HotKeys List"),
      subLabel: Dot("PpCHA", "Question Key(?)"),
    },
    {
      label: Dot("psZoP", "Drop files here to process them"),
      subLabel: Dot("mBgF1", "Mouse Action"),
    },
  ];
  let s = exportUtils.useSelector((v) => {
    return {
      close: v.forge.closePWAReminder,
    };
  });
  return (
    <div className="bg-slate-100 relative p-5 dark:bg-black  w-full p-0 m-0 h-full">
      <h1 className="m-0 mb-3">{props.emptyTitle}</h1>
      <ul className="list">
        {/* <div>{Dot("FOyHW", "Search Everywhere")}</div> */}
        {/* <div>{Dot("uwqGE", "Go to Tools")}</div> */}
        {helpers.map((x) => {
          return (
            <li className="flex mb-3">
              <div className="mr-2">{x.label}</div>
              <div className="text-gray-500">{x.subLabel}</div>
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-2 right-1 text-gray-600 dark:text-gray-400">
        <div>
          <ClosableText
            isClose={s.close}
            onClose={() => {
              FN_GetDispatch()(
                forgeSlice.actions.updateFieldNameValue({
                  closePWAReminder: true,
                })
              );
            }}
            text={Dot(
              "pqs7y3",
              "Kindly consider registering this webpage as a PWA to have full keymap support."
            )}
          ></ClosableText>
        </div>
      </div>
    </div>
  );
};
