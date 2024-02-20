
import CardPanel from "@/app/__CORE__/components/CardPanel";
import PhoneInput from "@/app/__CORE__/components/PhoneInput";
import GrailLayoutWithUser from "@/app/__CORE__/containers/GrailLayoutWithUser";
import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { AuthInfoProps, CombindSearchProps } from "@/app/[lang]/page";
import ActivationPage from "./ActivationPage";

export default (props: CombindSearchProps) => {
    let combindSearchProps = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p) => <ActivationPage {...p} />}></GrailLayoutWithUser>
}
