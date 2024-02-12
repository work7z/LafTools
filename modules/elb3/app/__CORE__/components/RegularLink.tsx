export default (props: {
    href: string,
    children: any
}) => {
    return <a href={props.href}>{props.children}</a>
}