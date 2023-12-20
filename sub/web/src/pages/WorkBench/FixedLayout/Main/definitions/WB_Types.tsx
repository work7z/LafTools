// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 12 Nov 2023
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
import { Intent } from "@blueprintjs/core";
import { ToolCategory, ToolSubCategory } from "./all-types";

export type EachWorkSpace = {
  Label: string;
  Id: string;
  Path: string;
  ShowPath: string;
};

export type WorkSpaceStruct = {
  WorkSpaces: EachWorkSpace[];
};

export type FnPureToolDefinition = ToolCategory & {
  Id: string;
  LabelByInit: string;
  // sdfsdf: ToolSubCategory[];
};
export interface PassToolViewerProp {
  category: string | null | undefined;
  findCurrentPureItem: FnPureToolDefinition | null | undefined;
}

export const fn_GetAllPureMenuArr = (): FnPureToolDefinition[] => {
  return [];
};

export type SystemStatusBarItem = {
  // define a struct for status bar
  text: string;
  icon?: string;
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  tooltip: string;
  intent: Intent;
  id: string;
};
export type RefAlloProp = {
  ref_p: any;
  ref_left: any;
  latest_size?: number[];
};


export type ShowNavOrContentProp = {
  className?: string;
  showNavOrContent: "nav" | "content";
};

type FN_OnItemClicked = (e: EachTabPanelProp, isThisActive: boolean) => any;

export type PropGenTabs = ShowNavOrContentProp & {
  highlightIntent: string;
  activeId: string;
  onActiveIdChange: (arg: EachTabPanelProp) => any;
  onItemClicked?: FN_OnItemClicked;
  tabs: EachTabPanelProp[];
  whichPart: "left" | "right";
};

export type TabNavProp = ShowNavOrContentProp & {
  onItemClicked?: FN_OnItemClicked;
  ref_allo?: RefAlloProp;
};

export type SysTabPaneProp = {
  hasOpacityWhenUnfocus?: boolean;
  loading?: boolean;
  children: any;
  // left nav list
  leftNavList: MenuDropDownListItem[];
  crtLeftNavId: string;
  onCrtLeftNavIdChange?: (newNavId: string) => any;

  rightCtrls: JSX.Element;
};
export type EachTabPanelProp = {
  id: string;
  label: string;
  desc: string;
  icon?: string;
  pathname?: string;
  panel?: (prop: PropGenTabsPanel) => JSX.Element;
};

export type PropGenTabsPanel = {};

export const VAL_CSS_TAB_TITLE_PANEL = 30;
export const VAL_CSS_CONTROL_PANEL = 34;
export const VAL_CSS_MENU_TITLE_PANEL = 30;

// export let langList = [
//   {
//     label: "English",
//     value: "en_US",
//   },
//   {
//     label: "简体中文(Simplified Chinese)",
//     value: "zh_CN",
//   },
//   {
//     label: "繁體中文(Traditional Chinese)",
//     value: "zh_HK",
//   },
// ];
export type FixedMenuItem = {
  id: string;
  intent?: string;
  label?: string;
  onClick?: () => any;
  icon?: string;
  spliter?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  routerLinkType?: boolean;
  children?: FixedMenuItem[];
};

export type FixedMenuBarProp = {
  leftPart?: JSX.Element;
  menus: FixedMenuItem[];
  requiredPageIcon?: boolean;
  rightShownContent?: string | JSX.Element;
};

export type FocusableProp = {
  focus: boolean;
  onFocus: (boolean) => any;
};

export type MenuDropDownListItem = {
  icon?: string;
  label: string;
  pathname?: string;
  value: string;
};
