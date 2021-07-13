import React, { SyntheticEvent } from "react";
import { parseObject } from '../data/data';
import "../style/lang.css";
interface LangProp {
    lang:string,
    changeLang:Function
}
interface LangState {
    activeIndex:number
}
export default class LangComponent extends React.Component<LangProp,LangState> {
    constructor(props:LangProp){
        super(props);
        this.state = {
            activeIndex:0
        };
    }
    onTabHandler(e:SyntheticEvent){
        const { nativeEvent } = e;
        const { classList } = nativeEvent.target as HTMLDivElement;
        if(classList.contains('tab-item') && !classList.contains('tab-active')){
            const { activeIndex } = this.state;
            let newActiveIndex = activeIndex === 0 ? 1 : 0;
            this.setState({
                activeIndex:newActiveIndex
            });
            this.props.changeLang(newActiveIndex);
        }
    }
    render(){
        const { lang } = this.props;
        const { activeIndex } = this.state;
        return (
            <div className="tab-container" onClick = { this.onTabHandler.bind(this) }>
                {
                    parseObject[lang]["tabs"].map(
                        (tab:string,index:number) => 
                        (
                            <div className={`tab-item ${ activeIndex === index ? 'tab-active' : ''}`}  key={tab}>{ tab }</div>
                        )
                    )
                }
            </div>
        )
    }
}