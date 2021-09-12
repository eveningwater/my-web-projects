import './App.css';
import React, { Component } from "react";
import marked from "marked";
import { getNotesData,createUUID, setNotesData } from './util';
const DOCUMENT_TITLE = "Notes App";
const createNoteContent = (template) => {
    return { __html:marked(template)};
}
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            notesData:[],
            notesRefs:[]
        }
        this.onAddNote = this.onAddNote.bind(this);
    }
    componentDidMount(){
        if(document.title !== DOCUMENT_TITLE){
            document.title = DOCUMENT_TITLE;
        }
        const storeNotesData = getNotesData() || [];
        if(Array.isArray(storeNotesData) && storeNotesData.length){
            Promise.resolve().then(() => {
                this.changeNotesData(storeNotesData);
                this.setState({
                    notesRefs:JSON.parse(JSON.stringify(storeNotesData)).map(item => React.createRef())
                });
            });
        }
    }
    componentWillUnmount(){
        
    }
    addNoteHandler(){
        this.onAddNote({ noteId:createUUID(),text:"",textareaRef:React.createRef(),className:"",isFocus:true },true);
    }
    onAddNote(note,focusStatus){
        const { notesData,notesRefs } = this.state;
        const { textareaRef,...props } = note;
        notesData.push(props);
        notesRefs.push(textareaRef);
        this.setState({ notesData:notesData,notesRefs:notesRefs },() => {
            if(focusStatus){
                textareaRef.current && textareaRef.current.focus();
            }
        })
    }
    onCreateSuccessNote(index,e){
        const { value } = e.target;
        const { notesData } = this.state;
        notesData[index].text = value;
        notesData[index].className=" hidden";
        notesData[index].isFocus = false;
        this.changeNotesData(notesData);
    }
    changeNotesData(data){
        this.setState({ notesData:data },() => setNotesData("notes",this.state.notesData));
    }
    deleteNoteHandler(id,index){
        let { notesData,notesRefs } = this.state;
        if(id && index >= 0){
            notesData = notesData.filter(note => note.noteId !== id);
            notesRefs.splice(index,1);
            this.setState({
                notesData:notesData,
                notesRefs:notesRefs
            },() => setNotesData("notes",this.state.notesData));
        }
    }
    editNoteHandler(id,index){
        let { notesData,notesRefs } = this.state;
        const textarea = notesRefs[index].current;
        if(!textarea)return;
        if(id && index >= 0){
            if(!notesData[index].isFocus){
                notesData[index].isFocus = true;
                notesData[index].className = "";
                const value = notesData[index].text.trim();
                textarea.value = value;
            }else{
                notesData[index].isFocus = false;
                notesData[index].className = " hidden";
                if(textarea){
                    notesData[index].text = textarea.value;
                    setNotesData("notes",notesData);
                }
            }
            this.setState({ notesData:notesData },() => {
                if(textarea.setSelectionRange){
                    textarea.focus();
                    textarea.setSelectionRange(textarea.value.length,textarea.value.length);
                }else if(textarea.createTextRange){
                    const range = textarea.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character",textarea.value.length);
                    range.moveStart("character",textarea.value.length);
                    range.select();
                }
            })
        }
    }
    render(){
        const { notesData,notesRefs } = this.state;
        return (
            <div className="app">
                <header className="note-header">
                    <button type="button" className="add-note-btn" onClick={ this.addNoteHandler.bind(this)}>
                        <i className="fas fa-plus"></i>
                        Add Notes
                    </button>
                </header>
                <div className="note-container">
                    {
                        notesData.map((note,index) => (
                            <div className="note" key={ note.text + index}>
                                <div className="note-tool">
                                    <i className="note-btn fas fa-edit" onClick={this.editNoteHandler.bind(this,note.noteId,index)}></i>
                                    <i className="note-btn fas fa-trash-alt" onClick={this.deleteNoteHandler.bind(this,note.noteId,index)}></i>
                                </div>
                                <div className="note-content" dangerouslySetInnerHTML={ createNoteContent(note.text)}></div>
                                <textarea 
                                    className={`note-textarea note-content${ note.className }`} 
                                    ref={notesRefs[index]}
                                    onBlur={this.onCreateSuccessNote.bind(this,index)}
                                    is-focus={note.isFocus.toString()}
                                ></textarea>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
