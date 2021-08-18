import { Component } from "react";

export default class Loading extends Component {
     constructor(props){
         super(props);
         this.state = {
             circleNumber:[
                 {
                     className:"circle"
                 },
                 {
                    className:"circle"
                },
                {
                    className:"circle"
                }
             ]
         }
     }
     render(){
         const { children,isLoading } = this.props;
         const { circleNumber } = this.state;
         return (
             <div className="loading" style={{ 'opacity':(isLoading ? 1 : 0) }}>
                 { children ? children : circleNumber.map((cir,index) => (<div className={ cir.className } key={cir.className + index}></div>))}
             </div>
         )
     }
}