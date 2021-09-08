import { Component, Fragment } from "react";
import "./style.css"
export default class Title extends Component {
    static getDerivedStateFromProps(props,state){
        if(props.level && props.level !== state.level){
            state.level = props.level;
        }
        return null;
    }
    constructor(props){
        super(props);
        this.state = {
            level:1
        }
    }
    render(){
        const { level,...restProps } = this.props;
        let ComponentName = `h${ this.state.level }`;
        return (
            <Fragment>
                <ComponentName { ...restProps }></ComponentName>
            </Fragment>
        )
    }
}