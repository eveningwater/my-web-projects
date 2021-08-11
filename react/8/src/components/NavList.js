import React from "react";

export default class NavList extends React.Component {
     constructor(props){
         super(props);
         this.state = {};
     }
     render(){
         const { navList } = this.props;
         return (
             <nav className="navList">
                 <ul>
                    {
                        navList.map((item,index) => (
                            <li key={ item.text + index }>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">{ item.text }</a>
                            </li>
                        ))
                    }
                 </ul>
             </nav>
         )
     }
}