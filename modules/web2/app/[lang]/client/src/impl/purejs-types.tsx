// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu < work7z@outlook.com>
//   LafTools Team < work7z@outlook.com>
//     Ryan Laf<get>
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

import { IconName } from "@blueprintjs/icons";
import { AppToolKeyType } from "./tools/info";
import { I18nItem } from "@/app/__CORE__/config/i18n";


export type NodeReq = {
  Lang: string;
  Id: string;
  Type: string;
  InputValue: any;
};

export type InputOutputEditorLang = {
  inputLang: string;
  outputLang: string;
}
export type FileValueMatcher = {
  Name: string;
  Value: any;
};

export type EachLang = {
  LabelInEnglish?: string;
  Label: string;
  LabelByLang?: string;
  Value: string;
};

/**
 * RuntimeSlice, contains below status
 * 1. Collapse or not
 * 2. Translation Selector
 * 3. Sessions and Related Config
 */
export type Val_ToolTabIndex = "output" | "tools" | "wiki" | "code" | "faq";
export type ToolDefaultOutputType = {
  // key refers to sessionId
  collapseOutput?: boolean;
  activeActionId?: string;
  collapseConfig?: boolean;
  latestViewPanelId?: string;
  toolTabIndex?: Val_ToolTabIndex;
  defaultOperationId?: string;
  autoRun?: string;
  ignoreEmptyStr?: string;
  // process status
  processError?: string;
  processText?: string;
  processOK?: boolean;
  processing?: boolean;
};

export type ExtensionInfoFormatted = {
  Id: string;
  Label: string;
  Description: string;
};

export type FlushIdValuePair = {
  id: string;
  value: any;
};

export type NodeRes<T extends any> = {
  Id: string;
  Lang: string;
  Type: string;
  OutputValue: T;
};

export type TranslatePassArg = string;

export type ToolCategory = {
  Id: string;
  Label: TranslatePassArg;
  TotalCount?: number;
  SubCategories: ToolSubCategory[];
};

export type ToolChildrenSetByInit = {
  Id?: string;
  Label?: TranslatePassArg;
  LabelByInit?: string;
  Description?: TranslatePassArg;
  DescriptionByInit?: string;
};


export type ToolSubCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: IconName;
  ChildrenIdSet: AppToolKeyType[]; // collect id only
};

export type ExtensionInfo = {
  Id: string;
  Label: TranslatePassArg;
  Description: TranslatePassArg;
  LabelByInit?: string;
  DescriptionByInit?: string;
};

export type ValueReq = {
  InputText: string;
  InputFile: string; // if it's not empty, then it means user specified a file to process
  ExtraConfigMap: Record<string, string>;
  ReturnAsFile: boolean; // by default false
};

export type ValueRes = {
  Err?: Error;
  OutputText: string;
  OutputFile: string;
};

export type ValueHandler = {
  ConvertText: (req: ValueReq) => ValueRes;
  ConvertFile: (req: ValueReq) => ValueRes;
};

export type ExtensionFuncMap = Record<string, ValueHandler>;

export type FormModel = Record<string, any>;

export type ExtensionAction = {
  Id: string;
  Label: TranslatePassArg;
  LabelByInit?: string;
  Tooltip?: TranslatePassArg;
  TooltipByInit?: string;
  CallFuncList: string[];
};

export type ExtensionVM = {
  Layout?: string;
  InitialFormModel?: FormModel;
  Info?: ExtensionInfo;
  Actions?: ExtensionAction[];
  DefaultRuntimeStatus?: ToolDefaultOutputType;
};

export type SubExtCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: string;
  Children: ExtensionVM[];
};

// define a export type that input NodeReq and output NodeRes
export type JobProcesser = (req: NodeReq) => Promise<NodeRes<any> | null>;
