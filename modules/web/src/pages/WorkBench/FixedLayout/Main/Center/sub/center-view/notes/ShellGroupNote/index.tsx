import { Allotment, AllotmentHandle } from "allotment";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { InputGroup } from "@blueprintjs/core";
import { Dot } from "../../../../../../../../../utils/TranslationUtils";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import TagList, { TagType } from "../../../../../../../../../components/TagList";
import React from "react";

// extension: .shg

export default () => {
    let [tags, setTags] = React.useState<TagType[]>([
        // list of tags: SIT2, UAT2, PROD2, DB1, DB2
        {
            id: "sit2",
            name: "SIT2",
            icon: "application"
        },
        {
            id: "uat2",
            name: "UAT2",
            icon: "application"
        },
        {
            id: "prod2",
            name: "PROD2",
            icon: "application"
        },
        {
            id: "db1",
            name: "DB1",
            icon: "database"
        },
        {
            id: "db2",
            name: "DB2",
            icon: "database"
        }
    ])
    let [activeTag, setActiveTag] = React.useState(tags[0].id)

    return <div className="w100 h100">
        <Allotment ref={e => {
            gutils.ExposureIt("allot_e", e)
            gutils.defer(() => {
                e && e.reset()
            })
        }}>
            <Allotment.Pane preferredSize={500}>
                <div className="p-2">
                    <div className="space-y-2">
                        <InputGroup leftIcon="search" placeholder={Dot("eqkd4W", "Filter shell commands")}></InputGroup>
                        <TagList onNewTag={(name: string) => {
                            setTags([...tags, {
                                id: name,
                                name: name,
                                icon: "application"
                            }])
                        }} activeTag={activeTag} setActiveTag={setActiveTag} tags={tags}></TagList>
                    </div>
                </div>
            </Allotment.Pane>
            <Allotment.Pane >
                <GenCodeMirror bigTextId="target" language="shell" lineWrap={false}></GenCodeMirror>
                {/* <GenCodeMirror bigTextId="shellgrp" lineWrap={false}></GenCodeMirror> */}
            </Allotment.Pane>
        </Allotment>
    </div>
}