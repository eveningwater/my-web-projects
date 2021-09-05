import React from "react";
export default class LeftSlide extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leftSlideItems:[
                {
                    text:"美女"
                },
                {
                    text:"大美女"
                },
                {
                    text:"超级大美女"
                },
                {
                    text:"超级超级大美女"
                }
            ]
        }
    }
    render(){
        const { leftSlideItems } = this.state;
        const { transform:{ translate,value },slideStyle:{ slideLeftWidth,itemWidth,left,top } } = this.props;
        return (
            <div className="left-slide" style={{ transform:`${ translate }(${ value })`,width:slideLeftWidth,left:left,top:top }}>
                {
                    leftSlideItems.map((slide,index) => (
                        <div key={slide.text + index} className="left-slide-item" style={{ width:itemWidth }}>
                            <h1>美女{(index + 1)}</h1>
                            <p>这是一个{ slide.text }</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}