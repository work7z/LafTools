import { VersionReleaseRequirement } from "./types";

let value: VersionReleaseRequirement = {
    increUpdtMinVer: null,
    increPartsIfPosi: [
        {
            name: 'bin',
            to: ['bin'],
            lastUpdatedAt: 1
        },
        {
            name: 'core',
            to: ['bin'],
            lastUpdatedAt: 1
        },
    ]
}

export default value;