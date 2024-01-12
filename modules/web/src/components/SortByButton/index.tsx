import { Button, InputGroup, Menu, MenuItem, Popover } from "@blueprintjs/core";
import { Dot } from "../../utils/TranslationUtils";

export type SortItem = {
    id: string
    name: string
}

export default (props: {
    items: SortItem[]
    activeItem?: string
    setActiveItem: (item: string) => void
    sortDirection?: "asc" | "desc"
    setSortDirection?: (direction: "asc" | "desc") => void
}) => {
    let activeItem = props.activeItem || props.items[0].id
    let activeObj = props.items.find(item => item.id == activeItem)

    return (
        <div className="text-gray-500 dark:text-gray-300 flex flex-row align-middle justify-center items-center space-x-1">
            <span >
                {Dot("oqHqVq", "Sort By")}:
            </span>
            <Button text={
                activeObj?.name + (
                    props.sortDirection == "asc" ? " ↑" : " ↓"
                )
            } small onClick={() => { }} ></Button>
            {/* <Button text={Dot("qN1LdZ2", "Last Modified")} small onClick={() => { }} ></Button> */}
            <Popover>
                <Button icon="cog" small></Button>
                <Menu>
                    {props.items.map(item => {
                        return <MenuItem active={
                            props.activeItem == item.id
                        } text={item.name} key={item.id} onClick={() => {
                            props.setActiveItem(item.id)
                        }}></MenuItem>
                    })}
                </Menu>
            </Popover>
        </div>
    )
}