import GenCodeMirror from "../../../../../../components/GenCodeMirror";
import { CommonPassProp } from "../transformer_types";

type PassProps = CommonPassProp & {};

export default (props: PassProps) => {
  let sessionId = props.sessionId;
  return (
    <GenCodeMirror value={"this is test data for " + sessionId}></GenCodeMirror>
  );
};
