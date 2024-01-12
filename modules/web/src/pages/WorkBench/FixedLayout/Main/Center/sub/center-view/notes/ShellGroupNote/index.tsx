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
import { Button, InputGroup } from "@blueprintjs/core";
import { Dot } from "../../../../../../../../../utils/TranslationUtils";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import TagList, {
    TagType,
} from "../../../../../../../../../components/TagList";
import React from "react";
import { CSS_TW_LAYOUT_BORDER_Y } from "../../../../../../../../../types/styles";
import SortByButton, {
    SortItem,
} from "../../../../../../../../../components/SortByButton";

// extension: .shg

export type ShellCommandGroup = {
    name: string;
    content: string;
    tags: string[];
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
    let [activeTag, setActiveTag] = React.useState(tags[0].id);
    let [shellCommands, setShellCommands] = React.useState<ShellCommandGroup[]>([
        {
            id: "copy-files-to-sit2",
            name: Dot("etV-l", "Copy Files to SIT2"),
            content: `rsync -avz --progress --stats --exclude-from=exclude.txt --delete -e "ssh -p 22" /home/username/Projects/ProjectName/ username@"SIT2":/home/username/Projects/ProjectName/`,
            tags: ["sit2"],
        },
        {
            id: "find old files which are not modified in 30 days",
            name: Dot("mabHq", "Find Old Files"),
            content: `find /home/username/Projects/ProjectName/ -type f -mtime +30`,
            tags: ["sit2", "uat2", "prod2"],
        },
        // item for database regulary backup
        {
            id: "backup-database",
            name: Dot("hMvh1", "Backup Database"),
            content: `mysqldump -u username -p --all-databases > all-databases.sql`,
            tags: ["db1", "db2"],
        },
        // item for database restore
        {
            id: "restore-database",
            name: Dot("oj23X", "Restore Database"),
            content: `mysql -u username -p < all-databases.sql`,
            tags: ["db1", "db2"],
        },
        // item for redis backup
        {
            id: "backup-redis",
            name: Dot("xQ_ls", "Backup Redis"),
            content: `redis-cli save`,
            tags: ["db1", "db2"],
        },
        // item for restart java service
        {
            id: "restart-java-service",
            name: Dot("ooiFU", "Restart Java Service"),
            content: `systemctl restart java.service`,
            tags: ["sit2", "uat2", "prod2"],
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
            name: Dot("oqHqVq", "Copy Times"),
        },
    ]);
    let [activeSortItem, setActiveSortItem] = React.useState<SortItem>(
        sortItems[0],
    );
    let [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

    return (
        <div className="w100 h100">
            <Allotment
                ref={(e) => {
                    gutils.ExposureIt("allot_e", e);
                    gutils.defer(() => {
                        e && e.reset();
                    });
                }}
            >
                <Allotment.Pane preferredSize={500}>
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
                            {shellCommands
                                .filter((e) => isAllMode || e.tags.includes(activeTag))
                                .map((e) => {
                                    return (
                                        <div
                                            className={
                                                "w-full p-2 px-3 hover:bg-slate-100 " +
                                                " dark:hover:bg-slate-700 transition-all duration-100 cursor-pointer"
                                            }
                                            key={e.id}
                                        >
                                            <div className="w-full">
                                                {e.name}
                                                {e.tags.map((e) => {
                                                    return (
                                                        <span className="px-1 py-0.5 mx-1 text-xs bg-lime-300 text-gray-700 rounded">
                                                            {e}
                                                        </span>
                                                    );
                                                })}{" "}
                                            </div>
                                            <div className="w-full overflow-ellipsis whitespace-nowrap">
                                                {e.content}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </Allotment.Pane>
                <Allotment.Pane>
                    <GenCodeMirror
                        bigTextId="target"
                        language="shell"
                        lineWrap={false}
                    ></GenCodeMirror>
                    {/* <GenCodeMirror bigTextId="shellgrp" lineWrap={false}></GenCodeMirror> */}
                </Allotment.Pane>
            </Allotment>
        </div>
    );
};
