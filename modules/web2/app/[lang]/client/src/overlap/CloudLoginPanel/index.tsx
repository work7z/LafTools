// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 6 Jan 2024
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

import { Alert, Dialog, Intent } from "@blueprintjs/core";
import FormSignIn from "../../online/FormSignIn";
import { Z_INDEX_CONFIRM } from "../../types/constants";
import { Dot } from "../../utils/TranslationUtils";
import exportUtils from "../../utils/ExportUtils";
import { FN_GetDispatch } from "../../nocycle";
import statusSlice from "../../reducers/statusSlice";

export let fn_format_title = (title: string) => {
    return title + ' - ' + Dot("TNoePE", "LafTools Cloud")
}
export default () => {
    let showSignIn = exportUtils.useSelector((state) => state.status.whetherShow.signIn);
    return (
        <Dialog
            style={{ zIndex: Z_INDEX_CONFIRM }}
            title={fn_format_title(Dot("qqK_x_", "Sign In"))}
            isOpen={showSignIn}
            onClose={() => {
                FN_GetDispatch()(
                    statusSlice.actions.setWhetherShow({
                        fieldName: "signIn",
                        fieldValue: false,
                    })
                )
            }}
        >
            <FormSignIn />
        </Dialog>
    );
};
