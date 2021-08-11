import React from "react";

export default class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className="page-content">
                { this.props.children }
            </div>
        )
    }
}