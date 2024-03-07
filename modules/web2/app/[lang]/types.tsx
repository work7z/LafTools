export type AppInfoClz = {
    version: string,
    releaseDate: string,
    timestamp: string
}

export type VersionReleaseRequirement = {
    consistentID: string | null, // e.g. if current consistent ID is not matched with one from new version, then we'd better do a full package release
    partials: { // in App, not every parts need to be downloaded and released, instead, we can reuse existing local directory to speed up the release process by checking their version
        id: string,
        destination: string[],
        partialConsistentID: string | null // if it's not matched, then need to do full package release.
    }[]
}