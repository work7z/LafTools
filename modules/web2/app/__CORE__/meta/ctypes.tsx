// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 6 Mar 2024
// Author:   
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


import React from "react";
import { CommonTransformerPassProp } from "../../[lang]/client/src/types/workbench-types";
import { AppOptViewMode } from "../../[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer";


export type AppInfoClz = {
    version: string,
    releaseDate: string,
    timestamp: string
}

export type VersionReleaseRequirement = {
    consistentID: string | null, // e.g. if current consistent ID is not matched with one from new version, then we'd better do a full package release
    partials: { // in App, not every parts need to be downloaded and released, instead, we can reuse existing local directory to speed up the release process by checking their version
        id: string,
        destination: string[],
        partialConsistentID: string | null // if it's not matched, then need to do full package release.
    }[]
}


export type CommonTransformerProps = CommonTransformerPassProp & {
    crtOptMode: AppOptViewMode
};

export type ClientPortalInfo = {
    portalMode: boolean
}
export let ClientPortalContext = React.createContext<ClientPortalInfo>({
    portalMode: false
})

