import { Button } from "@blueprintjs/core"
import { useState } from "react"

export default (props: {
    onCopy: () => any
}) => {
    let [copied, setCopied] = useState(false)
    return <Button onClick={() => {
        props.onCopy()
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }} icon={copied ? "tick" : "duplicate"} intent="success" minimal ></Button>
}