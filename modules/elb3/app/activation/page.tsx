
import CardPanel from "../__CORE__/components/CardPanel";
import PhoneInput from "../__CORE__/components/PhoneInput";
import GrailLayoutWithUser from "../__CORE__/containers/GrailLayoutWithUser";
import { Dot } from "../__CORE__/utils/TranslationUtils";
import { AuthInfoProps, CombindSearchProps } from "../page";
import ActivationPage from "./ActivationPage";

export default (props: {
    combindSearchProps: CombindSearchProps
}) => {
    let { combindSearchProps } = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p) => <ActivationPage {...p} />}></GrailLayoutWithUser>
}
