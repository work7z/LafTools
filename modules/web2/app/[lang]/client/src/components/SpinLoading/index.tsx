// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
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

import { Spinner } from "@blueprintjs/core";
import { Dot } from "../../utils/cTranslationUtils";
import './index.scss'
const SpinLoading = ((props) => {
    return (
        <div className="w100 h100 mywrapreal" style={props.style}>
            {props.loading ? (
                <div style={{ padding: "5px" }} className="mycentrereal">
                    <div>
                        <Spinner intent="none" />
                    </div>
                    <div style={{ marginTop: "8px" }}>
                        {props.loadingJSX || <p>{Dot("xMBv0", `Loading related resources...`)}</p>}
                    </div>
                </div>
            ) : (
                props.children
            )}
        </div>
    );
});
export default SpinLoading;

