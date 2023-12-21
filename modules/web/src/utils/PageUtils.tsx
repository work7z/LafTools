// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 28 Sep 2023
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

import _ from "lodash";
import gutils from "./GlobalUtils";
import staticDevJson from "../static/dev.json";
import { useHistory } from "react-router";
import TranslationUtils, { Dot } from "./TranslationUtils";
import { useEffect } from "react";
import { APPINFOJSON } from "../nocycle";

class Header {
  Name: string = "";
  Value: string = "";
}
class Request {
  Inited: boolean = false;
  UsingHTTPSProtocol: boolean = false;
  Host: string = "";
  Port: number = -1;
  Token: string = "";
  BaseCtxAPI: string = "";
}
const VAL_REQUEST_OBJ: Request = {
  Inited: false,
  UsingHTTPSProtocol: false,
  Host: "",
  Port: -1,
  Token: "",
  BaseCtxAPI: "",
};
const PageUtils = {
  useUpdateTitle(title, eff: string[]) {
    useEffect(() => {
      let suffix = Dot("5srFq", "LafTools") + `(${APPINFOJSON.version})`;
      let newTitle = "";
      if (gutils.empty(title)) {
        newTitle = suffix;
      } else {
        newTitle = title + " - " + suffix;
      }
      if (document.title != newTitle) {
        document.title = newTitle + "";
      }
    }, [title + TranslationUtils.CurrentLanguage, ...eff]);
  },
  GetRoutePath(subPath: string): string {
    return PageUtils.route_base + subPath;
  },
  route_base: "/app",
  UpdateRequestObj: (newRequestObj: Request) => {
    _.merge(VAL_REQUEST_OBJ, newRequestObj);
  },
  GetBaseURL: (): string => {
    return `${VAL_REQUEST_OBJ.UsingHTTPSProtocol ? `http` : `https`}://${
      VAL_REQUEST_OBJ.Host
    }:${VAL_REQUEST_OBJ.Port}${VAL_REQUEST_OBJ.BaseCtxAPI}`;
  },
  isFullScreen: (): boolean => {
    return document.fullscreenElement != null;
  },
  toggleFullScreen: () => {
    if (PageUtils.isFullScreen()) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  },
};

export default PageUtils;
