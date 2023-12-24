export let fn_format_description = (desc: string | undefined): string => {
    return desc?.replace(/\\n/g, '\n') || ''
}