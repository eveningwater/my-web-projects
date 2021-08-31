import { Component } from "react";
import "./card.css";
import Title from "../Title/Title";
import { isReactComponent,isString } from "../../utils/util";
const renderEmpty = value => !isReactComponent(value) && !isString(value);
const cardCover = ({ cover,bg,isLoading }) => {
    if(renderEmpty(cover)){
        return null;
    }
    return (
        <div className={`card-header${bg}`}>
            { isString(cover) ? <img src={isLoading ? "" : cover} alt={ isLoading ? "" : "图片加载中"} /> : cover }
        </div>
    )
}; 
const cardTitle = ({ title,bg,text,titleLevel,isLoading }) => {
    if(renderEmpty(title)){
        return null;
    }
    return (
        <Title level={titleLevel} className={`card-title${bg}${text}`}>
            { isLoading ? "" : title }
        </Title>
    )
}
const renderAvatar = ({ avatar,bg,isLoading }) => {
    if(renderEmpty(avatar)){
        return null;
    }
    return (
        <div className={`card-author-avatar${bg}`}>
            { isString(avatar) ? <img src={ isLoading ? "" : avatar} alt={ isLoading ? "" : "图片加载中" } /> : avatar }
        </div>
    )
}
const renderNameOrDate = ({name,date,bg,text,isLoading}) => {
    if(renderEmpty(name) && renderEmpty(date)){
        return null;
    }
    return (
        <div className="card-author-info">
            { name ? <strong className={`card-author-name${ isLoading ? " card-loading-content" : ""}${bg}${text}`}>{ isLoading ? "" : name}</strong> : null}
            { date ? <small className={`card-author-date${ isLoading ? " card-loading-content" : ""}${bg}${text}`}>{ isLoading ? "" : date}</small>: null}
        </div>
    )
}
const cardAuthor = ({avatar,name,date,bg,text,isLoading}) => {
    if(renderEmpty(avatar) && renderEmpty(name) && renderEmpty(date)){
        return null;
    }
    return (
        <div className="card-author">
            { renderAvatar({avatar,bg,isLoading}) }
            { renderNameOrDate({name,date,bg,text,isLoading})}
        </div>
    )
}
const renderChildren = ({ children,isLoading,bg,text,loadingContentList }) => {
    if(isLoading){
        return loadingContentList.map((load,index) => (<span className={`card-loading-content${bg}${text}`} key={load + index}>&nbsp;</span>))
    }else{
        return <p className="card-message">{ children }</p>
    }
}
export default class Card extends Component {
     static getDerivedStateFromProps(props, state) {
        if(props.isLoading){
            state.cardLoadClassName.bg = " animated-bg";
            state.cardLoadClassName.text = " animated-text";
        }else{
            state.cardLoadClassName.bg = state.cardLoadClassName.text = "";
        }
        return null;
     }
     constructor(props){
         super(props);
         this.state = {
             cardLoadClassName:{
                 bg:" animated-bg",
                 text:" animated-bg-text"
             }
         }
     }
     render(){
         const { cardLoadClassName,cardLoadClassName:{ bg,text }} = this.state;
         const loadingContentList = [cardLoadClassName,cardLoadClassName,cardLoadClassName];
         const { title,cover,titleLevel,children,name,avatar,date,isLoading } = this.props;
         return (
             <div className="card">
                 { cardCover({ cover,bg,isLoading }) }
                 <div className="card-content">
                     { cardTitle({ title,titleLevel,bg,text,isLoading })}
                     { renderChildren({ children,isLoading,bg,text,loadingContentList })}
                     { cardAuthor({avatar,name,date,bg,text,isLoading})}
                 </div>
             </div>
         )
     }
}