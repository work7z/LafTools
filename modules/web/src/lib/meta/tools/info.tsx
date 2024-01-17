import { Dot } from "../../../utils/TranslationUtils";

export type TypeInfoObject = {
    [key: string]: {
        Label: string;
        Description?: string;
    }
}
let AppToolInfoObj: TypeInfoObject = {
    "edc_base64": {
        Label: Dot("gkC8t", "Base64")
    }
}
export default AppToolInfoObj