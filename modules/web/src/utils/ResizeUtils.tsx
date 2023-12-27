import { key } from "localforage"


let fnMap: { [key: string]: () => void } = {

}

window.addEventListener("resize", () => {
    Object.values(fnMap).forEach(fn => {
        fn()
    })
})

export default {
    register(id: string, fn: () => void) {
        fnMap[id] = fn
    },
    unregister(id: string) {
        delete fnMap[id]
    }
}