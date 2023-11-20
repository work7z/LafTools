// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 19 Oct 2023
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import RouteUtils from "../utils/RouteUtils";
import URLUtils from "../utils/URLUtils";
import { FN_GetDispatch } from "../nocycle";
import AlertUtils from "../utils/AlertUtils";
import { Dot } from "../utils/TranslationUtils";
import DateUtils from "../utils/DateUtils";
import { URL_PREFIX_LOCAL } from "../styles/config";
import AjaxUtils from "../utils/AjaxUtils";
import TokenUtils from "../utils/TokenUtils";
import IDUtils from "../utils/IDUtils";
import { P_ACTION_readForgeFromServerViaAPI } from "./ForgeSlice";

let wsMemMap: { [key: string]: WebSocket | null } = {
  ws_system: null,
};

type wsState = {};

const initialState = {
  ws_system: null,
};

const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {},
});

type WsResponse<T> = {
  type: string;
  status: number;
  value: T;
};

let wsUtils = {
  sendValue(ws: WebSocket, Mtype: string, obj: any): void {
    let str = JSON.stringify({
      mtype: Mtype,
      Value: obj,
    });
    ws.send(str);
  },
};

export function P_ACTION_createSystemWS() {
  let ws = connectToWebSocket({ subLink: "/ws/system" });
  let dis = FN_GetDispatch();

  let prev_ws = wsMemMap.ws_system;
  prev_ws && closeWebSocket(prev_ws);
  wsMemMap.ws_system = ws;

  ws.onopen = () => {
    console.log("WebSocket connection established.");
    // do things here
    wsUtils.sendValue(ws, "ping", "this is test");
  };

  ws.onmessage = (event) => {
    let res = JSON.parse(event.data) as WsResponse<any>;
    console.log(`Received message: ${event.data}`, res);
    switch (res.type) {
      case "FORGE_STATE_UPDATE":
        P_ACTION_readForgeFromServerViaAPI();
        break;
    }
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
    AlertUtils.addMsgNone({
      msgId: "almCW",
      msgItem: {
        Description: Dot(
          "h6AeI",
          "Websocket connection closed at {0}",
          DateUtils.formatDateTime(new Date())
        ),
        Title: Dot("k17PG", "Websocket connection closed."),
        HasReadThisMsg: false,
      },
    });
  };

  ws.onerror = (error) => {
    console.error(`WebSocket error: ${error}`);
    AlertUtils.addMsg({
      msgId: "FaUHB",
      msgItem: {
        Title: Dot("m7WZw", "System Websocket Broken"),
        Description: Dot(
          "54cwb",
          "System Websocket API encountered an error: {0}",
          error
        ),
        HasReadThisMsg: false,
        Intent: "danger",
      },
    });
  };
}

export function connectToWebSocket({ subLink }): WebSocket {
  const ws = new WebSocket(
    "ws://" +
      window.location.host +
      URL_PREFIX_LOCAL +
      subLink +
      "?lut=" +
      TokenUtils.getLocalUserToken() +
      "&pd=" +
      IDUtils.PAGE_ID
  );
  return ws;
}

function closeWebSocket(ws: WebSocket | null) {
  if (ws) {
    ws.close();
    console.log("WebSocket connection closed.");
  }
}

export default wsSlice;
