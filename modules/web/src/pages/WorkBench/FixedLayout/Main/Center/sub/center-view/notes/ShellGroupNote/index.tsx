// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 11 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import { Allotment, AllotmentHandle } from "allotment";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { Button, InputGroup, Tooltip } from "@blueprintjs/core";
import { Dot } from "../../../../../../../../../utils/TranslationUtils";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import TagList, {
    TagType,
} from "../../../../../../../../../components/TagList";
import React, { useEffect } from "react";
import { CSS_TW_LAYOUT_BORDER_Y, VAL_CSS_MENU_TITLE_PANEL } from "../../../../../../../../../types/styles";
import SortByButton, {
    SortItem,
} from "../../../../../../../../../components/SortByButton";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import _ from "lodash";

// extension: .shg

export type ShellCommandGroup = {
    name: string;
    content: string;
    tags: string[];
    createTime: number;
    copyTimes?: number;
    id: string;
};

export default () => {
    let [tags, setTags] = React.useState<TagType[]>([
        // list of tags: SIT2, UAT2, PROD2, DB1, DB2
        {
            id: "sit2",
            name: "SIT2",
            icon: "application",
        },
        {
            id: "uat2",
            name: "UAT2",
            icon: "application",
        },
        {
            id: "prod2",
            name: "PROD2",
            icon: "application",
        },
        {
            id: "db1",
            name: "DB1",
            icon: "database",
        },
        {
            id: "db2",
            name: "DB2",
            icon: "database",
        },
    ]);
    let [activeTag, setActiveTag] = React.useState("all");
    let [shellCommands, setShellCommands] = React.useState<ShellCommandGroup[]>([
        {
            id: "copy-files-to-sit2",
            name: Dot("etV-l", "Copy Files to SIT2"),
            content: `rsync -avz --progress --stats --exclude-from=exclude.txt --delete -e "ssh -p 22" /home/username/Projects/ProjectName/ username@"SIT2":/home/username/Projects/ProjectName/`,
            tags: ["sit2"],
            createTime: 1612345678,
            copyTimes: 10,
        },
        {
            id: "find old files which are not modified in 30 days",
            name: Dot("mabHq", "Find Old Files"),
            content: `find /home/username/Projects/ProjectName/ -type f -mtime +30`,
            tags: ["sit2", "uat2", "prod2"],
            createTime: 1612345699,
            copyTimes: 12,
        },
        // item for database regulary backup
        {
            id: "backup-database",
            name: Dot("hMvh1", "Backup Database"),
            content: `mysqldump -u username -p --all-databases > all-databases.sql`,
            tags: ["db1", "db2", "prod2"],
            createTime: 1612345671,
            copyTimes: 30,
        },
        // item for database restore
        {
            id: "restore-database",
            name: Dot("oj23X", "Restore Database"),
            content: `mysql -u username -p < all-databases.sql`,
            tags: ["db1", "db2"],
            createTime: 1614345678,
            copyTimes: 12,
        },
        // item for redis backup
        {
            id: "backup-redis",
            name: Dot("xQ_ls", "Backup Redis"),
            content: `redis-cli save`,
            createTime: 1614342678,
            tags: ["db1",],
            copyTimes: 2,
        },
        // item for restart java service
        {
            id: "restart-java-service",
            name: Dot("ooiFU", "Restart Java Service"),
            content: `systemctl restart java.service`,
            tags: ["sit2", "uat2", "prod2"],
            createTime: 1614345678,
            copyTimes: 0,
        },
    ]);

    let isAllMode = activeTag == "all";

    let [sortItems, setSortItems] = React.useState<SortItem[]>([
        {
            id: "create-time",
            name: Dot("sglMS", "Create Time"),
        },
        {
            id: "copy-times",
            name: Dot("oqHqqVq", "Copy Times"),
        },
    ]);
    let [activeSortItem, setActiveSortItem] = React.useState<SortItem>(
        sortItems[0],
    );
    let [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
    let resizeCount = React.useRef(0);
    let [activeCommandId, setActiveCommandId] = React.useState<string>(shellCommands[0].id);
    let [hoverCommandId, setHoverCommandId] = React.useState<string>("");
    let formatted_shellCommands = React.useMemo(() => {
        return shellCommands.sort((a, b) => {
            if (activeSortItem.id == "create-time") {
                return sortDirection == "asc" ? a.createTime - b.createTime : b.createTime - a.createTime
            }
            if (activeSortItem.id == "copy-times") {
                return sortDirection == "asc" ? (a.copyTimes || 0) - (b.copyTimes || 0) : (b.copyTimes || 0) - (a.copyTimes || 0)
            }
            return -1
        })
    }, [shellCommands, sortDirection, activeSortItem])

    let [bigTextId] = React.useState(_.uniqueId(""));

    useEffect(() => {
        FN_GetDispatch()(
            FN_SetTextValueFromOutSideByBigTextId(bigTextId, shellCommands.find(e => e.id == activeCommandId)?.content || "")
        )
    }, [activeCommandId])

    return (
        <div className="w100 h100">
            <Allotment
                ref={(e) => {
                    if (!e) return;
                    if (resizeCount.current == 0) {
                        resizeCount.current++;
                        gutils.defer(() => {
                            e && e.reset();
                        });
                    }

                }}
            >
                <Allotment.Pane preferredSize={550}>
                    <div className="">
                        <div className="">
                            <div
                                className={
                                    "p-2  " + " border-t-0 " + CSS_TW_LAYOUT_BORDER_Y + ""
                                }
                                style={{ borderTop: "none" }}
                            >
                                <InputGroup
                                    leftIcon="search"
                                    placeholder={Dot("E62ej", "Filter Shell Commands")}
                                ></InputGroup>
                            </div>
                            <TagList
                                onNewTag={(name: string) => {
                                    setTags([
                                        ...tags,
                                        {
                                            id: name,
                                            name: name,
                                            icon: "application",
                                        },
                                    ]);
                                }}
                                activeTag={activeTag}
                                setActiveTag={setActiveTag}
                                tags={tags}
                            ></TagList>
                        </div>
                        <div>
                            {/*
                        left side: count of shell commands
                        right side: sort button
                        */}
                            <div
                                className={
                                    "flex justify-between px-2 py-1 using-edge-ui-bg   " +
                                    CSS_TW_LAYOUT_BORDER_Y
                                }
                            >
                                <div className="text-gray-500 dark:text-gray-300">
                                    <span>
                                        {Dot("oqHqqV", "Total: {0} Commands", shellCommands.length)}
                                    </span>
                                </div>
                                <SortByButton
                                    sortItems={sortItems}
                                    activeItem={activeSortItem.id}
                                    setActiveItem={(item) => {
                                        setActiveSortItem(sortItems.find((e) => e.id == item)!);
                                    }}
                                    sortDirection={sortDirection}
                                    setSortDirection={setSortDirection}
                                ></SortByButton>
                            </div>
                        </div>
                        <div className="cmd-list">
                            {formatted_shellCommands
                                .filter((e) => isAllMode || e.tags.includes(activeTag))
                                .map((e) => {
                                    return (
                                        <div
                                            onMouseMove={() => {
                                                setHoverCommandId(e.id)
                                            }}
                                            className={
                                                "w-full relative p-2 px-3  hover:bg-slate-100 " +
                                                " dark:hover:bg-slate-700 transition-all duration-100 cursor-pointer "
                                                +
                                                (
                                                    activeCommandId == e.id
                                                        ? " bg-slate-100 dark:bg-slate-700 "
                                                        : ""
                                                )
                                            }
                                            onClick={() => {
                                                setActiveCommandId(e.id)
                                            }}
                                            key={e.id}
                                        >
                                            <div className="w-full">
                                                <span className="">{e.name}</span>
                                                {e.tags.map((e) => {
                                                    return (
                                                        <span className="px-1 py-0.5 mx-1 text-xs bg-lime-300 text-gray-700 rounded">
                                                            {e}
                                                        </span>
                                                    );
                                                })}{" "}
                                            </div>
                                            <div className="w-[80%] pt-1 overflow-ellipsis whitespace-nowrap" style={{ marginTop: '2px' }}>
                                                <i>{e.content}</i>
                                            </div>
                                            {
                                                hoverCommandId == e.id ? <div className="absolute  -translate-y-1/2  top-1/2 right-4" >
                                                    <Tooltip content={Dot("ucDLv", "You've copied this item for {0} times", e.copyTimes || 0)} placement="right">
                                                        <Button onClick={() => {
                                                            AlertUtils.copyWithAlertCopied(e.content)
                                                        }} icon="duplicate" intent="success" minimal ></Button>
                                                        {/* {text = { e.copyTimes || 0 }} */}
                                                    </Tooltip>
                                                </div> : ''
                                            }
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Allotment.Pane>
                <Allotment.Pane>
                    <div className="using-edge-ui-bg px-4 flex flex-row justify-between items-center" style={{
                        height: VAL_CSS_MENU_TITLE_PANEL,
                    }}>
                        <div style={{
                            fontWeight: 500,
                            fontSize: 16
                        }}>
                            {activeCommandId}
                        </div>
                        <div>
                            other
                        </div>
                    </div>
                    <div style={{
                        height: `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
                    }}>
                        <GenCodeMirror
                            bigTextId={bigTextId}
                            language="shell"
                            lineWrap={false}
                        ></GenCodeMirror>
                    </div>
                    {/* <GenCodeMirror bigTextId="shellgrp" lineWrap={false}></GenCodeMirror> */}
                </Allotment.Pane>
            </Allotment>
        </div>
    );
};
