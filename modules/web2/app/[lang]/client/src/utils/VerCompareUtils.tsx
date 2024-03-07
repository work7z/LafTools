import _ from 'lodash'
let VerCompareUtils = {
    removeAlphaOrBeta: function (version: string) {
        return _.split(version, '-')[0].replace("V", "v").replace("v", "")
    },
    isNewVersion: function (crtVer: string, newVer: string): boolean {
        return VerCompareUtils.removeAlphaOrBeta(crtVer) < VerCompareUtils.removeAlphaOrBeta(newVer)
    }
}
export default VerCompareUtils