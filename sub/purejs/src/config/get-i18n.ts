
import {FileValueMatcher} from '../all-types'
import { Dot } from '../utils/translation'

let langList = [
    {"Label": Dot("f7akol","English"), "Value": "en"},
    {"Label": Dot("spdh98","Chinese (Simplified)"), "Value": "zh-cn"},
    {"Label": Dot("7dm0d8","Chinese (Traditional)"), "Value": "zh-hk"},
    {"Label": Dot("aj3nhd","German"), "Value": "de"},
    {"Label": Dot("d5x1rl","Spanish"), "Value": "es"},
    {"Label": Dot("o1umzi","French"), "Value": "fr"},
    {"Label": Dot("1jj0ri","Japanese"), "Value": "ja"},
    {"Label": Dot("5ggegx","Korean"), "Value": "ko"},
    {"Label": Dot("vci8rd","Dutch"), "Value": "nl"},
    {"Label": Dot("2ybu7j","Norwegian"), "Value": "no"},
    {"Label": Dot("w92j07","Russian"), "Value": "ru"},
    {"Label": Dot("2tib5m","Swedish"), "Value": "sv"},
    {"Label": Dot("ykganl","Danish"), "Value": "da"},
    {"Label": Dot("9tbbkt","Finnish"), "Value": "fi"},
    {"Label": Dot("vrfjnf","Italian"), "Value": "it"},
    {"Label": Dot("n94an4","Polish"), "Value": "pl"},
    {"Label": Dot("n24tes","Portuguese (Brazil)"), "Value": "pt"},
    {"Label": Dot("a4jbpq","Czech"), "Value": "cs"},
    {"Label": Dot("ediql2","Hungarian"), "Value": "hu"},
    {"Label": Dot("2lhqwp","Turkish"), "Value": "tr"}
]



let value: FileValueMatcher[] = [
    {
        Name: "app-i18n.json",
        Value: langList
    }
]
export default value