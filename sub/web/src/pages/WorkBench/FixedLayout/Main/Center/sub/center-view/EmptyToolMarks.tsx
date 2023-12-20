import { FN_GetDispatch } from "../../../../../../../nocycle";

import { Dot } from "../../../../../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import exportUtils from "../../../../../../../utils/ExportUtils";
import forgeSlice from "../../../../../../../reducers/ForgeSlice";
import { ClosableText } from "../../../../../../../components/ClosableText";

export default () => {
  let helpers: {
    label: string;
    subLabel?: string;
  }[] = [
    {
      label: Dot("QM2Ob", "Recent Tools"),
      subLabel: "Ctrl + E",
    },
    {
      label: Dot("pKHRT", "Go to Tools"),
      subLabel: Dot("HyIC_", "Slash Key (/)"),
    },
    {
      label: Dot("F0CCF", "HotKeys List"),
      subLabel: Dot("PpCHA", "Question Key(?)"),
    },
    {
      label: Dot("psZoP", "Drop files here to process them"),
      subLabel: Dot("mBgF1", "Mouse Action"),
    },
  ];
  let s = exportUtils.useSelector((v) => {
    return {
      close: v.forge.closePWAReminder,
    };
  });
  return (
    <div className="bg-slate-100 relative p-5 dark:bg-black  w-full p-0 m-0 h-full">
      <h1 className="m-0 mb-3">{Dot("dDGrH", "LafTools Navigator")}</h1>
      <ul className="list">
        {/* <div>{Dot("FOyHW", "Search Everywhere")}</div> */}
        {/* <div>{Dot("uwqGE", "Go to Tools")}</div> */}
        {helpers.map((x) => {
          return (
            <li className="flex mb-3">
              <div className="mr-2">{x.label}</div>
              <div className="text-gray-500">{x.subLabel}</div>
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-2 right-1 text-gray-600 dark:text-gray-400">
        <div>
          <ClosableText
            isClose={s.close}
            onClose={() => {
              FN_GetDispatch()(
                forgeSlice.actions.updateFieldNameValue({
                  closePWAReminder: true,
                })
              );
            }}
            text={Dot(
              "pqs7y3",
              "Kindly consider registering this webpage as a PWA to have full keymap support."
            )}
          ></ClosableText>
        </div>
      </div>
    </div>
  );
};
