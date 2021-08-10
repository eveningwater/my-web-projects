import "./step.css";
import React from "react";
const DOCUMENT_TITLE = "Progress Steps";
export default class Step extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
    }
    changeStep(item){
        this.props.onClickItem && this.props.onClickItem(item);
    }
    render(){
        const { width,children,stepItems,currentActive } = this.props;
        const over = num => num >= 100 ? 100 : num;
        const computedWidth = w => over((w * currentActive + 1).toFixed(2)) + '%';
        return (
            <div className="step-container" style={{ width:width }}>
                <div className="progress" style={{ width:computedWidth(33.3333) }}></div>
                {
                    children ? children : (
                        stepItems.map((item,index) => (
                            <div className={`circle ${ index <= currentActive ? 'active' : ''}`} onClick={ this.changeStep.bind(this,item) } key={ item + index }>{ item.text }</div>
                        ))
                    )
                }
            </div>
        )
    }
}