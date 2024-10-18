import { CSSProperties } from "react";
import Tooltip from "./Tooltip";
import HighLightCode from "./HighLightCode";
import Link from "./Link";
import { MDN_LINK } from "../const";
import { useCssTypeCode } from "../hooks";

export interface CodeTooltipProps extends React.HTMLAttributes<HTMLDivElement>{
    visible?: boolean;
    style?: CSSProperties;
    code: string;
}
const CodeTooltip = ({ visible, style,code,...rest }: CodeTooltipProps) => {
    const { res,id,tag,className } = useCssTypeCode(code);
    return (
        <Tooltip visible={visible} style={style} {...rest}>
            <div className="line-code">
                <HighLightCode code={res} language="html" />
            </div>
            <Link href={MDN_LINK}>选择器特性:</Link>
            <span>({ id },{ className },{ tag })</span>
            <div>总权重为:{ id * 100 + className * 10 + tag }</div>
        </Tooltip>
    )
}

export default CodeTooltip;