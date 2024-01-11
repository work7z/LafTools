import { Allotment, AllotmentHandle } from "allotment";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { InputGroup } from "@blueprintjs/core";
import { Dot } from "../../../../../../../../../utils/TranslationUtils";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import TagList from "../../../../../../../../../components/TagList";

// extension: .shg

export default () => {
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
                        <TagList></TagList>
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