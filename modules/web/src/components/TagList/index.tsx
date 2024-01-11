import { Tag } from "@blueprintjs/core"
import { Dot } from "../../utils/TranslationUtils"



// provide React components TagList based on blueprintjs framework
let TagList = () => {
    return <div>
        <Tag
            icon="tag"
            intent="primary"
            interactive={true}
            children={Dot("KgTdh", "Test")}
        ></Tag>
    </div>
}
export default TagList