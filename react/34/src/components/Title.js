import { Component,Fragment } from "react";
const isString = v => typeof v === "string";
const isNumber = v => typeof v === "number";
const _isNaN = Number.isNaN;
export default class Title extends Component {
    static getDerivedStateFromProps(props,state){
        const { level } = props;
        if((isString(level) || isNumber(level)) && !_isNaN(Number(level)) && Number(level) >= 1 && Number(level) <= 6){
            state.level = level;
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
        const ComponentName = `h${ this.state.level }`;
        return (
            <Fragment>
                <ComponentName {...restProps}></ComponentName>
            </Fragment>
        )
    }
}