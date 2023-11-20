import axios from "axios";
import gutils from "../utils/GlobalUtils";
import $ from "jquery";
import { connectToWebSocket } from "../slice/wsSlice";
import hmrJSON from "./hmr.json";

// TODO: make this hmr part in vite.config.js

let anyFileChangeCtn = 0;

export default () => {
  if (gutils.IsDevMode()) {
    // regulary retrieve and apply for this page
    let moniteResources = hmrJSON.Files;
    let ws = connectToWebSocket({ subLink: "/ws/dev-hmr" });
    ws.onmessage = (e) => {
      anyFileChangeCtn++;
      moniteResources.forEach((eachPath) => {
        (async () => {
          // do reload
          // alert("got chagned");
          let optRes = await axios.get(eachPath);
          let cssValue = optRes.data;
          $("#dynamic-css").text(cssValue);
        })();
      });
    };
  }
};
