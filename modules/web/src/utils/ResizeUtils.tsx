import { key } from "localforage"


let fnMap: { [key: string]: () => void } = {

}
let trigger = () => {
    Object.values(fnMap).forEach(fn => {
        fn()
    })
}
window.addEventListener("resize", () => {
    trigger()
})

export default {
    trigger,
    register(id: string, fn: () => void) {
        fnMap[id] = fn
    },
    unregister(id: string) {
        delete fnMap[id]
    }
}