import "./App.css";
import exportUtils from "./utils/ExportUtils";
import _ from "lodash";

let InitRouteHistory = _.once((hist) => {
  _.set(window, "hist", hist);
  const dispatch = exportUtils.dispatch();
  hist.listen((val) => {
    // logutils.log("route changed", val);
    // let mapList: { pathname: string; id: string }[] = [
    //   {
    //     pathname: URL_WORKBENCH_TOOLS,
    //     id: ID_TOOLS,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_FILES,
    //     id: ID_FILES,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_MANUALS,
    //     id: ID_HISTORY,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_NOTES,
    //     id: ID_NOTES,
    //   },
    // ];
    // _.forEach(mapList, (x) => {
    //   if (val.pathname.startsWith(x.pathname)) {
    //     RouteMem[x.id] = val.pathname;
    //   }
    // });
  });
});

export default InitRouteHistory;
