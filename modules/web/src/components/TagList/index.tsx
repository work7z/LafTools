import { Tag } from "@blueprintjs/core"
import { Dot } from "../../utils/TranslationUtils"
import {
    Callout,
    PanelStack,
    ProgressBar,
    AnchorButton,
    Tooltip,
    Dialog,
    Drawer,
    Overlay,
    Alert,
    RadioGroup,
    MenuItem,
    Radio,
    ButtonGroup,
    TextArea,
    HotkeysProvider,
    Intent,
    Position,
    Toaster,
    Checkbox,
    NumericInput,
    FormGroup,
    HTMLSelect,
    ControlGroup,
    InputGroup,
    Navbar,
    NavbarHeading,
    NonIdealState,
    NavbarDivider,
    NavbarGroup,
    Alignment,
    Classes,
    Icon,
    Card,
    Elevation,
    Button,
    Popover,
    Menu,
    MenuDivider,
} from "@blueprintjs/core";
import AlertUtils from "../../utils/AlertUtils";
export type TagType = {
    id: string;
    name: string
    icon: string
}

// provide React components TagList based on blueprintjs framework
let TagList = (props: {
    tags: TagType[]
    onNewTag: (name: string) => void,
    activeTag?: string
    setActiveTag: (tag: string) => void
}) => {
    return <div className="py-0 space-x-2">
        {props.tags.map((e, i) => {
            let isactive = e.id == props.activeTag
            return <Tag
                icon={e.icon as any}
                intent={isactive ? "primary" : "none"}
                onClick={() => {
                    props.setActiveTag(e.id)
                }}
                minimal={true || !isactive}
                interactive={true}
                children={e.name}
            ></Tag>
        })}
        <Tag minimal icon="add" onClick={() => {
            let tid = "s89rM"
            AlertUtils.win_prompt({
                id: tid,
                msg: Dot("eqkqd4W", "Please provide a name for the new tag"),
                fn(yesOrNo: boolean, obj) {
                    if (!obj?.iptIfHave) {
                        AlertUtils.popError(new Error(Dot("JA_Bp", "Please provide a name for the new tag at first.")))
                        return
                    }
                    if (yesOrNo) {
                        props.onNewTag(obj?.iptIfHave)
                        AlertUtils.deletePromptList(tid);
                    }
                },
            })
        }} interactive intent="success"></Tag>
    </div >
}
export default TagList