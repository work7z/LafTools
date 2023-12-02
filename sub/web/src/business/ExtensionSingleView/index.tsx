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
  ButtonProps,
  Divider,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../styles/var";
import TranslationUtils, { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice, { ExtensionVM } from "../../slice/apiSlice";

import { Link } from "react-router-dom";
import PageUtils from "../../utils/PageUtils";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import "./index.scss";
import forgeSlice from "../../slice/ForgeSlice";
import AlertUtils from "../../utils/AlertUtils";
import ToolSlice from "../../slice/toolSlice";
import ContentInESV from "./ContentInESV";
import StatusBarInESV from "./StatusBarInESV";
import ExtHookUtils from "../../utils/ExtensionHookUtils";
import { logutils } from "../../utils/LogUtils";
import {
  SYNC_KEY_INPUT_REGION_DEFAULT,
  SYNC_KEY_OUTPUT_REGION_DEFAULT,
} from "../../slice/ExtSlice";
import ExtraInfoESV from "./ExtraInfoESV";
import moment from "moment";
import AdaptUtils from "../../utils/AdaptUtils";

type PassWProp = {
  sessionId: string;
  extId: string;
};
export type PropExtSessionContext = {
  sessionId: string;
  extId: string;
};
export type PropExtVMContext = {
  inst: ExtensionVM | undefined;
};
let tmp: PropExtSessionContext = {
  sessionId: "default_sessionId",
  extId: "default_extId",
};
let tmp2: PropExtVMContext = {
  inst: undefined,
};
export const ExtSessionContext = React.createContext(tmp);
export const ExtVMContext = React.createContext(tmp2);

let Footer = () => {
  let items = [
    Dot(
      "9OzZm",
      "Boost your productivity with LafTools - the ultimate solution for all your programming needs."
    ),
    Dot(
      "fzh4L",
      "Simplify your coding process with LafTools - the all-in-one solution for your programming tasks."
    ),
    Dot(
      "s96jp",
      "Maximize your coding efficiency with LafTools - the ultimate toolkit for developers."
    ),
    Dot(
      "mQywY",
      "Take your coding to the next level with LafTools - the comprehensive solution for all your programming needs."
    ),
    Dot(
      "AtXA9",
      "Accelerate your coding process with LafTools - the perfect productivity tool for developers."
    ),
    Dot(
      "VtIkD",
      "Optimize your coding workflow with LafTools - the ultimate solution for efficient and reliable code."
    ),
    Dot(
      "8OURB",
      "Revolutionize your coding experience with LafTools - the perfect solution for all your programming challenges."
    ),
    Dot(
      "jRcjH",
      "Transform your coding process with LafTools - the ultimate solution for streamlined and efficient code."
    ),
    Dot(
      "aQKpO",
      "Empower your coding skills with LafTools - the optimal solution for all your programming requirements."
    ),
    Dot(
      "CbHVE",
      "Enhance your coding productivity with LafTools - the ideal solution for efficient and effective code."
    ),
    Dot(
      "9IVWH",
      "Upgrade your coding game with LafTools - the software for all your programming needs."
    ),
  ];
  // rotate items every 3 seconds, by useState and useEffect
  let [index, setIndex] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      // random index in items
      setIndex(Math.floor(Math.random() * items.length));
    }, 13000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);
  return (
    <div className="esv-footer-w">
      <div>
        Copyright © 2016 - {moment().format("YYYY")}{" "}
        {Dot("jaj7M", "All rights reserved.")}{" "}
      </div>
      {TranslationUtils.CurrentLanguage == "zh_CN" &&
      AdaptUtils.isPortalMode() ? (
        <span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            粤ICP备16114169号-7
          </a>
        </span>
      ) : (
        "" || (
          <span>
            {/* <a
            href="javascript:void(0);"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            Guangdong ICP No. 16114169-7
          </a> */}
            {/* <a
            href="https://LafTools.cc/"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            {Dot("cfYYN", "Discover More")}
          </a> */}
          </span>
        )
      )}
      {/* <div>
       
          <span>
            <a
              className="normaltext"
              href="mailto:work7z@outlook.com"
              target="_blank"
              rel="nofollow"
            >
              {items[index]}
            </a>
          </span>
      </div> */}
      <div>
        <span>
          <Tooltip
            content={Dot(
              "PapkF",
              "If you have any questions or suggestions about LafTools, please feel free to let us know. We are always looking for ways to improve our product and provide the best possible experience for our users. You can contact us at work7z@outlook.com. Thank you for using LafTools!"
            )}
          >
            {items[index]}
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

const InnerExtensionSingleView = (props: PassWProp) => {
  let m_makeIt = exportUtils.useSelector((v) => {
    return {
      val_extensionIdRefreshMap: v.tool.extensionIdRefreshMap[props.extId + ""],
    };
  });
  let val_extensionIdRefreshMap_id = m_makeIt.val_extensionIdRefreshMap;

  let extDetailQuery = apiSlice.useGetToolExtDetailQuery(
    { extId: props.extId + "", val_extensionIdRefreshMap_id },
    { refetchOnMountOrArgChange: true }
  );

  let extStatusData = ExtHookUtils.useExtStatusData();
  let sessionId = props.sessionId;
  let extOp = ExtHookUtils.useExtOperator();
  let dis = exportUtils.dispatch();

  let cachedVMValue: PropExtVMContext = useMemo(() => {
    return {
      inst: extDetailQuery.data?.payload?.value,
    };
  }, [[props.extId, props.sessionId, extDetailQuery.status].join("-")]);

  let quickALL = ExtHookUtils.useQuickAll();

  useEffect(() => {
    if (extStatusData == null) {
      extOp.initExtStatusMap({
        sessionId,
        extId: props.extId,
      });
    }
  }, [extStatusData]);

  let r = QueryUtils.validateResult(extDetailQuery, {
    label: Dot("zwd4v", "Extension Detail"),
  });
  if (r) {
    return r;
  }

  if (extStatusData == null) {
    return (
      <NonIdealState
        icon="exchange"
        title={Dot("lzGS2", "Extension Detail")}
        description={Dot("uFcDQ", "Initializing the statusdata...")}
      />
    );
  }

  if (!props.extId) {
    return (
      <NonIdealState
        icon="error"
        title={Dot("uV5Bi", "Unable to Load Extension")}
        description={Dot("e--gB", "Extension ID is not provided.")}
      />
    );
  }
  let extensionVM = extDetailQuery.data?.payload.value;
  gutils.ExposureIt("extensionVM", extensionVM, true);

  return (
    <ExtVMContext.Provider value={cachedVMValue}>
      <div className="esv-w" key={val_extensionIdRefreshMap_id}>
        <StatusBarInESV extId={props.extId} extensionVM={extensionVM} />
        <ContentInESV extId={props.extId} extensionVM={extensionVM} />
        <ExtraInfoESV extId={props.extId} extensionVM={extensionVM} />
        <Footer></Footer>
      </div>
    </ExtVMContext.Provider>
  );
};

export default (props: { extId: string }) => {
  const sessionId = useMemo(() => {
    return props.extId + "_s1";
  }, [props.extId]);

  let cachedCtxValue: PropExtSessionContext = useMemo(() => {
    return {
      extId: props.extId,
      sessionId: sessionId,
    };
  }, [[props.extId, sessionId].join("-")]);

  return (
    <ExtSessionContext.Provider value={cachedCtxValue}>
      <InnerExtensionSingleView
        key={sessionId}
        extId={props.extId}
        sessionId={sessionId}
      />
    </ExtSessionContext.Provider>
  );
};
