// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 26 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  EachWorkSpace,
  URL_WORKBENCH,
  VAL_CSS_MENU_TITLE_PANEL,
  VAL_CSS_TAB_TITLE_PANEL,
} from "../../../../../types/workbench-types";
import { Dot } from "../../../../../utils/TranslationUtils";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import _ from "lodash";
import gutils from "../../../../../utils/GlobalUtils";
import AlertUtils from "../../../../../utils/AlertUtils";
import DesktopUtils from "../../../../../utils/DesktopUtils";
import apiSlice from "../../../../../reducers/apiSlice";
import AjaxUtils from "../../../../../utils/AjaxUtils";
import QueryUtils from "../../../../../utils/QueryUtils";
import { useWorkSpaceListGet } from "../../../../../utils/WorkSpaceUtils";

let WorkSpaceListItem = (props: { refetch: any; item: EachWorkSpace }) => {
  Dot("ph5jH", "Handling this part");
  Dot("SdGcT", "Other part");

  let [hover, setHover] = useState(false);
  let x = props.item;
  let [viewContent, setViewContent] = useState(false);
  return (
    <Tooltip
      className="block w-full"
      content={Dot("mWXeh", "Workspace ID: {0}", x.Id)}
      placement="right"
    >
      <Link
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
          setViewContent(false);
        }}
        className="mt-1 w-full relative hover:text-black p-2 rounded  px-3 flex no-underline hover:no-underline text-black hover:bg-blue-200 hover:bg-opacity-20"
        to={URL_WORKBENCH+"/" + x.Id}
        style={{
          flexDirection: "column",
        }}
      >
        <div className="">{x.Label}</div>
        <div className="text-stone-400">{x.ShowPath}</div>
        <div
          className={
            "align-end absolute right-[5px] top-[27%]  " +
            (!hover ? " hidden " : "")
          }
        >
          <Popover
            isOpen={viewContent}
            usePortal={false}
            onClosing={() => {
              setViewContent(false);
            }}
            onOpening={() => {
              //
            }}
            interactionKind="click"
            placement="left"
            minimal
            content={
              <Menu
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {[
                  {
                    label: Dot("NMLOn1", "Open Workspace"),
                    intent: "none",
                    icon: "folder-open",
                    onClick: () => {
                      DesktopUtils.openDir(x.Path);
                    },
                  },
                  {
                    label: Dot("NMLOn", "Copy FilePath"),
                    intent: "none",
                    icon: "duplicate",
                    onClick: () => {
                      gutils.copy(x.Path, true);
                      AlertUtils.popCopyOK();
                    },
                  },
                  {
                    label: Dot("asElV", "Remove"),
                    intent: "danger",
                    icon: "trash",
                    onClick: async () => {
                      let confirmed = await AlertUtils.win_confirm_promise({
                        id: "oLBBG",
                        msg:
                          Dot(
                            "ZAGva",
                            "Are you sure to delete this workspace?"
                          ) +
                          " " +
                          Dot(
                            "HjvV3",
                            "We will not delete its files on the disk, just remove this record from the list."
                          ),
                      });
                      if (!confirmed) {
                        return;
                      }
                      AjaxUtils.DoLocalRequestWithNoThrow({
                        isPOST: true,
                        url: "/workspace/users/delete",
                        data: {
                          Id: x.Id,
                        },
                      }).then((x) => {
                        props.refetch && props.refetch();
                        if (x?.error) {
                          AlertUtils.popError(x?.error);
                        } else {
                          AlertUtils.popOK();
                        }
                      });
                    },
                  },
                ].map((x) => {
                  return (
                    <MenuItem
                      intent={x.intent as any}
                      icon={x.icon as any}
                      onClick={() => {
                        x.onClick && x.onClick();
                        //
                      }}
                      text={x.label}
                    ></MenuItem>
                  );
                })}
              </Menu>
            }
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                setViewContent(!viewContent);
              }}
              icon="cog"
              small
              intent="none"
              minimal
            ></Button>
          </Popover>{" "}
        </div>
      </Link>
    </Tooltip>
  );
};

export default () => {
  let workspaceListRes = apiSlice.useGetWorkspaceListByUserIdQuery({});
  let r = QueryUtils.validateResult(workspaceListRes, {
    label: Dot("RjCO3", "Workspace List"),
  });
  let allWorkspaces: EachWorkSpace[] = useWorkSpaceListGet();

  let [filterText, onFilterText] = useState("");

  let finalFilteredWorkspace = useMemo(() => {
    let lowFilterText = _.toLower(filterText);
    if (_.trim(lowFilterText) == "") {
      return allWorkspaces;
    }
    let finarr = _.filter(allWorkspaces, (x) => {
      return (
        (_.toLower(x.Label + "") + _.toLower(x.Path)).indexOf(lowFilterText) !=
        -1
      );
    });
    return finarr;
  }, [filterText, allWorkspaces]);

  let entryJSX = (
    <div
      className="flex flex-col   mt-10 overflow-auto h-[500px] w-[500px] using-edge-ui-bg border-gray-300 dark:border-gray-600  border-[1px] shadow-lg shadow-slate-100 dark:shadow-slate-900 rounded self-start px-2 py-2"
      style={{
        minHeight: "400px",
      }}
    >
      <div className="mb-4 text-center ">
        <b>{Dot("eYjWI", "Workspace List")}</b>
      </div>
      <div>
        <InputGroup
          leftIcon="search"
          className="flex flex-row items-center bg-transparent border-b  focus:outline-none focus:border-blue-500 "
          type="text"
          small
          value={filterText}
          onChange={(e) => {
            onFilterText(e.target.value);
          }}
          placeholder={Dot("SMD13", "Filter Workspaces")}
          rightElement={
            <ButtonGroup>
              <Tooltip
                placement="bottom"
                content={Dot("adpgq", "Create new workspace")}
              >
                <Button
                  className="mr-2"
                  icon="add"
                  text={Dot("ImUmf", "New")}
                  intent={Intent.PRIMARY}
                  small
                  onClick={() => {
                    let idForWin = "U57tO";
                    AlertUtils.win_prompt({
                      id: idForWin,
                      msg: Dot(
                        "zjDJk",
                        "Please provide the workspace directory path"
                      ),
                      fn: async function (yesOrNo, obj) {
                        if (yesOrNo) {
                          let iptIfHave = obj?.iptIfHave;
                          // verify iptIfHave
                          if (_.isEmpty(iptIfHave)) {
                            AlertUtils.popError([
                              Dot("1Npez", "Please provide the path"),
                            ] as any);
                            return;
                          }
                          iptIfHave = _.trim(iptIfHave + "");
                          let isLinux = iptIfHave.startsWith("/");
                          let t1 = await DesktopUtils.checkExistAndAskAndMkdir(
                            iptIfHave
                          );
                          if (!t1) {
                            return;
                          }
                          let r = await AjaxUtils.DoLocalRequestWithNoThrow({
                            isPOST: true,
                            url: "/workspace/users/add",
                            data: {
                              // Id: gutils.uuid(),
                              // Label: _.split(
                              //   iptIfHave,
                              //   isLinux ? "/" : "\\"
                              // ).pop(),
                              Path: iptIfHave,
                            },
                          });
                          if (r?.error) {
                            AlertUtils.popError(r?.error);
                            return false;
                          } else {
                            AlertUtils.popCreated();
                            AlertUtils.deletePromptList(idForWin);
                          }
                          workspaceListRes.refetch();
                        } else {
                          AlertUtils.popError([
                            Dot("ICefi", "Cancelled"),
                          ] as any);
                        }
                      },
                    });
                    // open a dialog to create a new workspace
                  }}
                />
              </Tooltip>
              <Tooltip
                placement="bottom"
                content={Dot("dV5Eq", "Refresh workspace list")}
              >
                <Button
                  icon="refresh"
                  text={Dot("5dF7o", "Refresh")}
                  small
                  intent={Intent.SUCCESS}
                  onClick={() => {
                    // refresh workspace list
                    workspaceListRes.refetch();
                    AlertUtils.popRefresh();
                  }}
                />
              </Tooltip>
            </ButtonGroup>
          }
        />
      </div>
      {r}
      <div className="mt-2">
        {_.size(finalFilteredWorkspace) == 0 ? (
          <div className="w-full h-full text-center center">
            {Dot("9zCSc", "No available workspaces")}
          </div>
        ) : (
          ""
        )}
        <div>
          {finalFilteredWorkspace.map((x) => {
            return (
              <WorkSpaceListItem
                refetch={workspaceListRes.refetch}
                key={x.Id}
                item={x}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className=" common-bg-color-align flex justify-center relative content-start align-top "
      style={{
        height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
      }}
    >
      <div>
        <div className="z-0 absolute left-0 top-0 w-full h-full pattern-cross  dark:pattern-cross pattern-gray-100 dark:pattern-gray-700 pattern-bg-transparent pattern-opacity-60 pattern-size-8"></div>
      </div>
      <div className="z-10">{entryJSX}</div>
    </div>
  );
};
