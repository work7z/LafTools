// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 29 Sep 2023
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

import { TreeNodeInfo } from "@blueprintjs/core";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  ButtonProps,
  CardList,
  Divider,
} from "@blueprintjs/core";
export const CLZ_ROOT_DARK = `bp5-dark`;
export const CLZ_ROOT_LIGHT = `bp5-light bp5-bg-light`;
export const CLZ_SECOND_TEXT = "bp5-text-muted";
export const CLZ_SMALL_TEXT = "bp5-text-small";

export type IsOKType = PayloadAction<{ isOK: boolean }>;
export type IsLoadingType = PayloadAction<{ isLoading: boolean }>;
export type SendErrorAction = PayloadAction<{ e: Error }>;
export type TextValueAction = PayloadAction<{ value: string }>;
export type LangDefinition = { [key: string]: string };

export type PopoverButtonProp = ButtonProps & { overlay?: string };
export type MapKV = { [key: string]: any };

export type PromiseAction = PayloadAction<{
  id: string;
  fn: () => Promise<any>;
}>;

export type PayloadListData<T> = { payload: { list: T[] } };
export type PayloadValueData<T> = { payload: { value: T } };

export type TreeWrapInfo = {
  updateId: string;
  nodes: TreeNodeInfo[];
  selected?: string[];
  expanded?: string[];
};

export type LocalResponse = {};

export const LANG_ZH_CN = "zh_CN";
export const LANG_ZH_HK = "zh_HK";
export const LANG_EN_US = "en_US";

export interface ToolParamType {
  extId: string | null;
  category: string | null;
}
export type AnyMapType = { [key: string]: any };
