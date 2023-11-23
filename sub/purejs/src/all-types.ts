export type NodeReq = {
  Lang: string;
  Id: string;
  Type: string;
  InputValue: any;
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

export type TranslatePassArg = string[];

export type ToolCategory = {
  Id: string;
  Label: TranslatePassArg;
  SubCategories: ToolSubCategory[];
};

export type ToolSubCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: string;
  ChildrenIdSet: string[]; // collect id only
};

export type ExtensionInfo = {
  Id: string;
  Label: TranslatePassArg;
  Description: TranslatePassArg;
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
  Tooltip?: TranslatePassArg;
  CallFuncList: string[];
};

export type ExtensionVM = {
  Layout?: string;
  InitialFormModel?: FormModel;
  Info?: ExtensionInfo;
  Actions?: ExtensionAction[];
};
export type SubExtCategory = {
  Id: string;
  Label: TranslatePassArg;
  Icon: string;
  Children: ExtensionVM[];
};

// define a export type that input NodeReq and output NodeRes
export type JobProcesser = (req: NodeReq) => Promise<NodeRes<any> | null>;
