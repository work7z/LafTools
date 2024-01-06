import { useEffect } from "react"
import onlineAPISlice from "../reducers/onlineAPISlice";

export type LoginStatus = {
    Loading: boolean;
    Info?: {
        HasLogin?: boolean;
        IsAdmin?: boolean;
    }
}

export let useCloudLoginStatus = (): LoginStatus => {
    let st = onlineAPISlice.useGetUserStatusQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    })
    return {
        Loading: true,
    }
}