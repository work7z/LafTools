'use client'

import { useState } from "react";
import { Dot } from "../../utils/cTranslationUtils";

// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 9 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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


// define a component that provide isClose, onClose, and text
export type ClosableTextProps = {
  goText?: string,
  goLink?: string,
  closeKey: string,
  text: string | JSX.Element;
}
export const ClosableText = (props: ClosableTextProps) => {
  let [ctn, setCtn] = useState(0)
  let isClose = false // localStorage.getItem(props.closeKey) != null;
  let onClose = () => {
    localStorage.setItem(props.closeKey, "true");
    setCtn(ctn + 1)
  }

  // if (isClose) {
  //   return <></>;
  // }
  let closeItem = <span
    onClick={() => {
      onClose();
    }}
    className=" hover:underline cursor-pointer"
  >
    [{Dot("4vdfwf", "OK")}]
  </span>
  return (
    <div className="flex flex-column">
      <div className="small-text flex-grow">
        {props.text}
        {!props.goLink ? '' : !isClose ? true ? (
          <a href={props.goLink || 'javascript:void(0);'} target='_blank' className="mr-[1px]">
            [{props.goText || Dot("4vdfwf", "OK")}]
          </a>
        ) : props.goLink ? (
          <span>
            <a href={props.goLink} target='_blank' className="mr-[1px]">
              [{props.goText || Dot("4vdfwf", "OK")}]
            </a>
            {closeItem}
          </span>
        ) : (
          closeItem
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
