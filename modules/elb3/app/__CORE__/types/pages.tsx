
export type PageProps<T, K> = {
    params: object & T & { lang?: string },
    searchParams: object & K
}