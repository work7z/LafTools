export type AppInfoClz = {
    version: string,
    releaseDate: string,
    timestamp: string
}

export type VersionReleaseRequirement = {
    increUpdtMinVer: string | null, // e.g. incremental update minimal version, = 2.1.0
    increPartsIfPosi: {
        name: string,
        to: string[],
        lastUpdatedAt: number
    }[]
}