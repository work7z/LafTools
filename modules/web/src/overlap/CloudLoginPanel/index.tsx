import { Alert, Dialog, Intent } from "@blueprintjs/core";
import FormSignIn from "../../online/FormSignIn";
import { Z_INDEX_CONFIRM } from "../../types/constants";
import { Dot } from "../../utils/TranslationUtils";
import exportUtils from "../../utils/ExportUtils";
import { FN_GetDispatch } from "../../nocycle";
import statusSlice from "../../reducers/statusSlice";

export let fn_format_title = (title: string) => {
    return title + ' - ' + Dot("TNoPE", "LafTools Cloud")
}
export default () => {
    let showSignIn = exportUtils.useSelector((state) => state.status.whetherShow.signIn);
    return (
        <Dialog
            style={{ zIndex: Z_INDEX_CONFIRM }}
            title={fn_format_title(Dot("qK_x_", "Sign In"))}
            isOpen={showSignIn}
            onClose={() => {
                FN_GetDispatch()(
                    statusSlice.actions.setWhetherShow({
                        fieldName: "signIn",
                        fieldValue: false,
                    })
                )
            }}
        >
            <FormSignIn />
        </Dialog>
    );
};
