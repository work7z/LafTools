import { useEffect } from "react"
import onlineAPISlice, { UserPayload } from "../reducers/onlineAPISlice";

export type LoginStatus = {
    Loading: boolean;
    Info?: UserPayload
}

export let useCloudLoginStatus = (): LoginStatus => {
    let st = onlineAPISlice.useGetUserStatusQuery({}, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        pollingInterval: 1000 * 60 * 5, // 5 minutes a time
    })
    return {
        Loading: st.isLoading,
        Info: st.data?.payload.value,
    }
}