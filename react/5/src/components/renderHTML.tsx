import { FunctionComponent } from "react";
import "../style/render.css";
interface PropType {
    template?:string,
}
export function createMarkup(template:string) {
  return { __html: template };
}
const RenderHTMLComponent:FunctionComponent<PropType> = (props:PropType) => {
    const { template } = props;
    let renderTemplate = typeof template === 'string' ? template : "";
    return <div dangerouslySetInnerHTML={createMarkup( renderTemplate )} className="render-content"></div>;
}
export default RenderHTMLComponent;