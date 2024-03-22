// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 24 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../utils/GlobalUtils";
import { logutils } from "../utils/LogUtils";
import RouteMem from "../types/router-mem";
import statusSlice from "../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PageUtils from "../utils/PageUtils";
import TranslationUtils, { Dot } from "../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../reducers/systemSlice";
import {
  ID_AILah,
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_RESOURCES,
  ID_TOOLS,
} from "../types/constants";
import { type } from "jquery";
import apiSlice from "../reducers/apiSlice";

import { InnerToolPanel } from "../pages/WorkBench/FixedLayout/Main/Center/nav/functional/panel-group/panels/ToolPanel";
import { InnerFilePanel } from "../pages/WorkBench/FixedLayout/Main/Center/nav/functional/panel-group/panels/FilePanel";
import InnerNotePanel from "../pages/WorkBench/FixedLayout/Main/Center/nav/functional/panel-group/panels/NotePanel";
import { ToolCategory, ToolSubCategory } from "./purejs-types-READ_ONLY";


import { useHistory, useLocation } from "react-router";
import qs from "querystring";
import _ from "lodash";
import { URL_WORKBENCH_WORKSPACE } from "../types/constants";
import { useParams } from "react-router-dom";
import { EachTabPanelProp, PageQueryType } from "./workbench-types";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
import settingsSlice from "../reducers/settingsSlice";
import { useSearchParams } from "next/navigation";
import { ParamStateState, TabLeftType } from "../reducers/state/paramStateSlice";

export let NoAvailableDataPanel = () => {
  return <div>{Dot("xs22XLF", "No available data for this item ID, please consider selecting other items.")}</div>;
};


export let NoAvailablePanel = () => {
  return <div>{Dot("22XLF", "Not finished yet")}</div>;
};

export let useLeftTabsList = (): EachTabPanelProp[] => {
  // let func_mergeParameter = useMergeParameter();
  let sq = useSearchQuery();
  let func_mergeWithWS = useMergeParamWithWorkSpace();
  return useMemo<EachTabPanelProp[]>((): EachTabPanelProp[] => {
    return [
      {
        desc: Dot(
          "pEk1kk",
          "LafTools presents useful functionalities for you here."
        ),
        icon: "briefcase",
        id: ID_TOOLS,
        // pathname: SUB_URL_WORKBENCH_TOOLS_CATEGORY,
        label: Dot("RNBze0", "Tools"),
        panel: InnerToolPanel,
      },
      {
        desc: Dot(
          "5NJeddqGsu1",
          "This section includes computer materials, wiki articles, usage guides, and more."
        ),
        // pathname: URL_WORKBENCH_MANUAL,
        icon: "manual",
        id: ID_MANUAL,
        label: Dot("YrVqdd683", "Manuals"),
      },
      {
        desc: Dot(
          "5NJedqddqGsu1",
          "This section includes computer resources that can be used to build your own projects."
        ),
        // pathname: URL_WORKBENCH_MANUAL,
        icon: "book",
        id: ID_RESOURCES,
        label: Dot("cNQp_", "Resources"),
      },
      /**
          {
             desc: Dot(
               "qWw3eTH",
               "This part helps to maintain files on your local disk or cloud disk."
             ),
             // pathname: URL_WORKBENCH_FILES,
             icon: "folder-close",
             panel: InnerFilePanel,
             id: ID_FILES,
             label: Dot("znVRwq", "Files"),
           },
       */

      {
        desc: Dot("Ttrqqet", "Write and Save your thoughts here!"),
        // pathname: URL_WORKBENCH_NOTES,
        icon: "git-repo",
        id: ID_NOTES,
        panel: InnerNotePanel,
        label: Dot("VEfeqZG", "Notes"),
      },

      {
        desc: Dot(
          "p8Exxc1s",
          "There are various tools that leverage AI technologies to perform tasks more efficiently in AI Laboratory."
        ),
        // pathname: URL_WORKBENCH_FILES,
        icon: "lab-test",
        panel: InnerFilePanel,
        id: ID_AILah,
        label: Dot("jR1zX", "AI Lab"),
      },

      // write item for manuals

      /*
        {
          desc: Dot(   "5NJeGsu1",
            " E-Mail, you can easily organize your inbox, compose and send messages, and stay on top of your correspondence. Up to now, it's used as a communication tool between users and our team only."
          ),
          pathname: URL_WORKBENCH_HISTORY,
          icon: "inbox",
          id: ID_HISTORY,
          label: Dot("YrVq683", "Mail"),
        },
        */
    ].map((x) => {
      return {
        ...x,
        pathname: func_mergeWithWS({
          l: x.id as TabLeftType,
        }),
      };
    });
  }, [_.values(sq)]);
};


export let useSearchQuery = (): PageQueryType => {

  let ps = exportUtils.useSelector((v) => {
    return v.paramState
  })
  return ps;


  // useSearchParams()
  // const [searchParams] = useSearchParams(); // Re-render every time any search param changes
  // const [page] = useSearchParams(); // Re-render only when `page` changes
  // console.log('page', page)
  // let location = useLocation()
  // // let location = window['location']
  // // let [count, setCount] = useState(0);
  // // let m2 = exportUtils.useSelector(v => {
  // //   return {
  // //     a: v.settings.updatePathCount
  // //   }
  // // })
  // // useEffect(() => {
  // //   console.log('update', location.search)
  // //   setCount(count + 1)
  // //   FN_GetDispatch()(
  // //     settingsSlice.actions.updatePathCount(m2.a + 1)
  // //   )
  // // }, [
  // //   window.location.search
  // // ])
  // const query = new URLSearchParams(location.search);
  // let obj = {};
  // query &&
  //   query.forEach((v, k) => {
  //     if (k && v) {
  //       obj[k] = v;
  //     }
  //   });
  // _.defaultsDeep(obj, {
  //   f: "tools",
  //   b: "translation"
  // });
  // return obj as any;
};

export let useMergeParameter = (): any => {
  let searchQ = useSearchQuery();
  // convert searchQ to object
  // merge with obj
  return (obj: Partial<PageQueryType>) => {
    let mergeIt = {
      ...(searchQ || {}),
      ...(obj || {})
    } as any
    return qs.stringify(mergeIt);
  };
};

export let useMergeParamWithWorkSpace = (): (obj: Partial<ParamStateState>) => any => {
  let mergeP = useMergeParameter();

  return (obj: Partial<ParamStateState>) => {
    return "/" + "?" + mergeP(obj)
    // return "/" + "?" + qs.stringify(obj)
    // return "" + ;
  };
};