// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import { useEffect } from "react"
import onlineAPISlice, { UserPayload } from "../reducers/onlineAPISlice";

export type LoginStatus = {
    Loading: boolean;
    Info?: UserPayload
}

export let useCloudLoginStatus = (): LoginStatus => {
    let st = onlineAPISlice.useGetUserStatusQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        pollingInterval: 1000 * 60 * 5, // 5 minutes a time
    })
    return {
        Loading: st.isLoading,
        Info: st.data?.payload.value,
    }
}