import { FN_GetDispatch } from "../nocycle";
import apiSlice from "../slice/apiSlice";
import AjaxUtils from "./AjaxUtils";
import AlertUtils from "./AlertUtils";
import { Dot } from "./TranslationUtils";

export default {
  openDir: async function (dir: string) {
    AlertUtils.popMsg("success", {
      message: Dot(
        "dkarh",
        "Okie, toolbox opened the directory. If there's no window pop up, please check if your platform support this function, or the directory is in the server."
      ),
    });
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/openDir",
      data: {
        dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
    }
  },
};
