import { useEffect } from "react";
import LoadingBar from 'react-top-loading-bar'
import exportUtils from "../../utils/ExportUtils";
import { ACTION_callInitAllDataAtOnceFromInitSystemEnv } from "../../reducers/systemSlice";
import _ from "lodash";
import AlertUtils from "../../utils/AlertUtils";

export default () => {
    let forgeObj = exportUtils.useSelector((val) => ({
        dark: val.forge.DarkThemeMode,
    }));
    let systemObj = exportUtils.useSelector((val) => ({
        LoadSystemData: val.system.LoadSystemData,
    }));
    let isEnvNotLoad = !systemObj.LoadSystemData;

    let sysObj = exportUtils.useSelector((val) => ({
        LoadSystemData: val.system.LoadSystemData,
        ProgressText: val.system.SysInitStatus.ProgressText,
        ProgressError: val.system.SysInitStatus.ProgressError,
        HasError: val.system.SysInitStatus.HasError,
        SysInitStatus: val.system.SysInitStatus,
        ProgressBarValue: val.system.SysInitStatus.ProgressBarValue,
    }));
    const dis = exportUtils.dispatch();

    let run_init = () => {
        dis(ACTION_callInitAllDataAtOnceFromInitSystemEnv());
    };

    useEffect(() => {
        run_init();
    }, [1]);

    // let statusList = [
    //     sysObj.SysInitStatus.IsLangPacksOK,
    //     sysObj.SysInitStatus.IsSystemPrefOK,
    //     sysObj.SysInitStatus.IsSystemUpdatesOK,
    // ]
    // let okStatusListSize = _.filter(statusList, (val) => val).length;
    useEffect(() => {
        if (!sysObj.HasError) {
            return;
        }
        AlertUtils.win_alert({
            id: "xfnxf",
            msg: sysObj.ProgressError + "",
        })
    }, [sysObj.HasError])

    // if (!isEnvNotLoad) return <span></span>
    // (okStatusListSize / _.size(statusList)) * 100
    return <LoadingBar
        progress={sysObj.HasError ? 60 : sysObj.ProgressBarValue || 1}
        // color="lightblue"
        // color="#007BFF"
        // lightblue
        color={sysObj.HasError ? "red" : forgeObj.dark ? "#007BFF" : "yellowgreen"}
        height={3}
    // onLoaderFinished={() => setProgress(0)}
    // ref={() => { }} 
    />
}