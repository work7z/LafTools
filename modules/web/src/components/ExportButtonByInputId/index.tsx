import { Button } from "@blueprintjs/core";
import { Dot } from "../../utils/TranslationUtils";
import { copy } from "../../nocycle";
import { FN_GetActualTextValueByBigTextId } from "../../actions/bigtext_action";
import AlertUtils from "../../utils/AlertUtils";

export let ExportButtonByInputId = (props: { bigtextId: string }) => {
    return (
        <Button
            small
            icon="duplicate"
            intent="success"
            text={Dot("Fv-zz", "Copy Result")}
            onClick={() => {
                AlertUtils.copyWithAlertCopied(FN_GetActualTextValueByBigTextId(props.bigtextId))
            }}
        ></Button>
    );
};
