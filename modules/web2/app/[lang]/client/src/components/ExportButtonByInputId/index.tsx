// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 27 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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

import { Button } from "@blueprintjs/core";
import { Dot } from "../../utils/cTranslationUtils";
import { copy } from "../../nocycle";
import { FN_GetActualTextValueByBigTextId } from "../../actions/bigtext_action";
import AlertUtils from "../../utils/AlertUtils";

export let ExportButtonByInputId = (props: { bigtextId: string }) => {
    return (
        <Button
            small
            icon="duplicate"
            intent="success"
            text={Dot("Fv-zz", "Copy Result")}
            onClick={() => {
                AlertUtils.copyWithAlertCopied(FN_GetActualTextValueByBigTextId(props.bigtextId))
            }}
        ></Button>
    );
};
