import { FC, useState,useEffect,useRef } from "react";
import { isMobile, on } from "../utils/util";
import listenForOutsideClick from "../utils/click-outside";
import styleMobile from "../style/app-mobile-style";
import style from "../style/app-style";
import { useCallback } from "react";

interface PropType {
    onChange:Function;
}
interface LangType {
    label:string;
    value:string;
}
const Header:FC<PropType> = (props:PropType) => {
    const langList:Array<LangType> = [
        {
            value: "en",
            label: "英语"
        },
        {
            value: "zh",
            label: "汉语"
        },
        {
            value: "jp",
            label: "日语"
        },
        {
            value: "kor",
            label: "韩语"
        },
        {
            value: "fra",
            label: "法语"
        },
        {
            value: "ru",
            label: "俄语"
        },
        {
            value: "de",
            label: "德语"
        }
    ];
    const [currentLang,setCurrentLang] = useState("en");
    const [appStyle,setAppStyle] = useState("");
    const [showPanel,setShowPanel] = useState(true);
    const [listening,setListening] = useState(false);
    const [showMenu,setShowMenu] = useState(false);
    const panelRef = useRef(null);
    const getCurrentLabel = () => {
        const find = langList.find(i => i.value === currentLang);
        return find && find.label;
    }
    const isLoadMobile = () => (document.body.clientWidth || document.documentElement.clientWidth) > 1132;
    const onResizeHandler = useCallback(() => {
        setShowMenu(!!isMobile() || !isLoadMobile());
        setShowPanel(!isMobile() || isLoadMobile());
        const styleText = isMobile() || !isLoadMobile() ? styleMobile : style;
        setAppStyle(styleText);
    },[]);
    const onTogglePanel = () => setShowPanel(!showPanel);
    const onChangeHandler = (item:LangType) => {
         setCurrentLang(item.value);
         props.onChange && props.onChange(item.value);
    }
    useEffect(() => {
        listenForOutsideClick(listening,setListening,panelRef,setShowPanel);
        onResizeHandler();
        on(window,"resize",onResizeHandler);
    },[onResizeHandler,listening]);
    return (
        <header className="rt-header">
            <style>{ appStyle }</style>
            <span className="rt-title">当前翻译语言类型:</span>
            <span className="rt-result">{ getCurrentLabel() }</span>
            <div className="rt-lang-panel-container" ref={panelRef}>
                <i className="rt-iconfont rt-menu rt-more" onClick={onTogglePanel} style={{ 'display':showMenu ? 'block' : 'none' }}></i>
                <ul className={`rt-lang-panel${ showPanel ? ' show' : ''}${ showMenu ? ' rt-mobile-lang-panel' : ''}`}>
                    {
                        langList.map((item,index) => (
                            <li 
                                className={`rt-li ${currentLang === item.value ? 'checked' : ''}`} 
                                key={item.value + index}
                                onClick={onChangeHandler.bind(this,item)}
                            >{item.label}</li>
                        ))
                    }
                </ul> 
            </div>
        </header>
    )
}
export default Header;