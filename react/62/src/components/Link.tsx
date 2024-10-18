import { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
}

const Link = ({ children,rel = 'noopener noreferrer',target = '_blank',...rest }: LinkProps) => {
    const attrMap = {
        ...rest,
        rel,
        target
    }
    return (
        <a {...attrMap}>{children}</a>
    )
}

export default Link;