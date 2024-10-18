import { CSSProperties, useId } from "react"
import { createPortal } from "react-dom";
export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>{ 
    visible?: boolean;
    children?: React.ReactNode;
    style?: CSSProperties;
}
const Tooltip = ({ visible,children,style,...rest }: TooltipProps) => {
    const toolTipId = useId();
    return (
        <>
            {
                visible && createPortal(
                    <div id={toolTipId} className="tooltip" style={style} {...rest}>
                        {children}
                    </div>,
                    document.body
                )
            }
        </>
    )
}

export default Tooltip;