import { Spinner } from "@blueprintjs/core";
import { Dot } from "../../utils/TranslationUtils";
import './index.scss'
const SpinLoading = ((props) => {
    return (
        <div className="w100 h100 mywrapreal" style={props.style}>
            {props.loading ? (
                <div style={{ padding: "5px" }} className="mycentrereal">
                    <div>
                        <Spinner intent="none" />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        {props.loadingJSX || <p>{Dot("xMBv0", `Loading related resources...`)}</p>}
                    </div>
                </div>
            ) : (
                props.children
            )}
        </div>
    );
});
export default SpinLoading;

