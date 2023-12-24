
import localforage from "localforage";
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
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
} from "../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../utils/GlobalUtils";
import _ from "lodash";
import { SysTabPane } from "../../../../../../../components/SysTabPane";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../../../actions/layout_action";
import { useSearchQuery } from "../../../../../../../types/workbench-hook";
import { Dot } from "../../../../../../../utils/TranslationUtils";
// import MultipleSessionLeftView from "../../../containers/MultipleSessionLeftView/index";
import TextTranslator from "./TextTranslator";
import MultipleSessionLeftView from "../../../../../../../containers/MultipleSessionLeftView";


export default () => {
  return (
    <MultipleSessionLeftView
      defaultSessionId="en2zhcn"
      defaultSessionMap={
        {
          "en2zhcn": {
            //
          }
        }
      }
      defaultSessionList={
        // TODO: for other languages, update its content
        [
          {
            label: Dot("QRAdA", "English to Chinese"),
            id: "en2zhcn",
          },
          {
            label: Dot("bVlBN", "Chinese to English"),
            id: "zhcn2en",
          }
        ]
      }
      sessionType="translator" body={TextTranslator}></MultipleSessionLeftView>
  )
} 