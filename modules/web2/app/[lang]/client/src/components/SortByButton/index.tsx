// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 12 Jan 2024
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

import { Button, InputGroup, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { Dot } from "../../utils/cTranslationUtils";

export type SortItem = {
    id: string
    name: string
}

export default (props: {
    sortItems: SortItem[]
    activeItem?: string
    setActiveItem: (item: string) => void
    sortDirection: "asc" | "desc"
    setSortDirection: (direction: "asc" | "desc") => void
}) => {
    let activeItem = props.activeItem || props.sortItems[0].id
    let activeObj = props.sortItems.find(item => item.id == activeItem)

    return (
        <div className="text-gray-500 dark:text-gray-300 flex flex-row align-middle justify-center items-center space-x-1">
            <span >
                {Dot("oqHqVq", "Sort By")}:
            </span>
            <Button text={
                activeObj?.name + (
                    props.sortDirection == "asc" ? " ↑" : " ↓"
                )
            } small onClick={() => {
                props.setSortDirection(
                    props.sortDirection == "asc" ? "desc" : "asc"
                )
            }} ></Button>
            {/* <Button text={Dot("qN1LdZ2", "Last Modified")} small onClick={() => { }} ></Button> */}
            <Popover

                placement="bottom-start"
                captureDismiss={true}
                minimal
                canEscapeKeyClose
                interactionKind="click"
                shouldReturnFocusOnClose
                content={
                    <Menu>
                        {props.sortItems.map(item => {
                            return <MenuItem active={
                                props.activeItem == item.id
                            } text={item.name} key={item.id} onClick={() => {
                                props.setActiveItem(item.id)
                            }}></MenuItem>
                        })}
                    </Menu>
                }
            >
                <Button icon="cog" small></Button>
            </Popover>
        </div>
    )
}