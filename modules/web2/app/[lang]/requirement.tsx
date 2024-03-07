import { VersionReleaseRequirement } from "./types";

let value: VersionReleaseRequirement = {
    consistentID: '20240307',
    partials: [
        {
            id: 'bin',
            destination: ['bin'],
            partialConsistentID: '20240307'
        },
        {
            id: 'core',
            destination: ['bin'],
            partialConsistentID: '20240307'
        },
    ]
}

export default value;