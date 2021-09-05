import React from "react";
const image_url = "https://www.eveningwater.com/my-web-projects/jQuery/12/img/";
export default class RightSlide extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rightSlideItems:[
                "1.jpg",
                "2.jpg",
                "3.jpg",
                "4.jpg",
            ]
        }
    }
    render(){
        const { rightSlideItems } = this.state;
        const { transform:{ translate,value },slideStyle:{ slideRightWidth,itemWidth} } = this.props;
        return (
            <div className="right-slide" style={{ transform:`${ translate }(${ value })`,width:slideRightWidth  }}>
                {
                    rightSlideItems.map((slide,index) => (
                        <div key={slide + index} style={{ backgroundImage:`url(${image_url + slide})`,width:itemWidth }} className="right-slide-item"></div>
                    ))
                }
            </div>
        )
    }
}