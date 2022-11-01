import React from 'react'
import NotesContainer from './NotesContainer'
import randomNumber from '../../../server/functions/randomNumber'
import Note from './Note'


class NotesApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {notes:[],currentNoteId:0}
        this.addLog = this.addLog.bind(this)
        this.addNote = this.addNote.bind(this)
        this.noteId = this.noteId.bind(this)
        this.handlecloseeditor = this.handlecloseeditor.bind(this)
        this.setNewHeading = this.setNewHeading.bind(this)
        this.setNewContent = this.setNewContent.bind(this)
        this.deleteNote = this.deleteNote.bind(this)
        this.pinNote = this.pinNote.bind(this)
    }
    addLog(info){
        var logscopy = this.state.logs
        logscopy.unshift(info)
        this.setState({logs:logscopy})
    }
    componentDidMount(){

        fetch('./getData/notes',{
            method:'GET',
            headers:{'Content-Type':'Application/json'},
        }).then(res=>res.json()).then(result=>{
            result.reverse()
            this.setState({notes:result})
        }).catch(err=>console.log(err))

            setTimeout(()=>{
                $(function(){
                    $('.notes-flex-container.pinned').masonry({
                        itemSelector: '.note-container',
                        isAnimated: true
                      });
                      $('.notes-flex-container.unpinned').masonry({
                        itemSelector: '.note-container',
                        isAnimated: true
                      });
                })
            },1000)

    }
    addNote(){
        var id = randomNumber(10)
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        var todayDate = currentDate.toLocaleDateString('en-us', options)
        var info = {
            id:id,
            dateCreated:todayDate,
            pinned:false,
            data:{heading:'Heading here!',content:'Content here!'}
        }
        var statecopy = this.state.notes
        statecopy.unshift(info)
        
        fetch('./postData/notes/new',{
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:JSON.stringify(info)
        }).then(res=>res.json()).then(result=>console.log(result)).catch(err=>console.log(err))

        this.setState({notes:statecopy})

        this.setState({currentNoteId:id})

    }
    componentDidUpdate(){
        $(function(){
            new Masonry( '.notes-flex-container.pinned', { 
                itemSelector: '.note-container',
                isAnimated: true
            })
    
            new Masonry( '.notes-flex-container.unpinned', { 
                itemSelector: '.note-container',
                isAnimated: true
            })
        })
    }
    noteId(e){
        if(this.state.currentNoteId==0){
            this.setState({currentNoteId:e})
        }
    }
    handlecloseeditor(e){
        this.setState({currentNoteId:0})
    }
    setNewHeading(e){
        var statecopy  = this.state.notes
        var index = statecopy.findIndex(a=>a.id == this.state.currentNoteId)

        statecopy[index].data.heading = e
        this.setState({notes:statecopy})
    }
    setNewContent(e){
        var statecopy  = this.state.notes
        var index = statecopy.findIndex(a=>a.id == this.state.currentNoteId)

        statecopy[index].data.content = e
        this.setState({notes:statecopy})
    }
    deleteNote(e){
        var data = {
            id : e
        };
        var statecopy = this.state.notes
        var index = statecopy.findIndex(a=>a.id == e)

        statecopy.splice(index,1)

        this.setState({notes:statecopy})

        fetch('./postData/notes/delete',{
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(result=>console.log(result)).catch(err=>console.log(err))
    }

    pinNote(e){
        var statecopy = this.state.notes
        var index = statecopy.findIndex(a=>a.id == e)

        var data = {
            id : e,
            pinned:!statecopy[index].pinned
        };

        statecopy[index].pinned = !statecopy[index].pinned

        this.setState({notes:statecopy})

        fetch('./postData/notes/pin',{
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(result=>console.log(result)).catch(err=>console.log(err))
    }
    render(){
        return(
            <React.StrictMode>
            <div id="NotesApp" className='app'>
                <div className="app-heading">
                    <div>Your Notes</div>
                    <span>Keep a copy of your thoughts</span>
                </div>
                
                <button type="button" onClick={this.addNote}>Create New Note + </button>
                <div className="notes-container">
                    <div className='notes-flex-container pinned'>
                        {this.state.notes.length>0 ? this.state.notes.map(info=>
                            info.pinned?
                            <NotesContainer id={info.id} created={info.dateCreated} pinned={info.pinned} key={info.id} content={info.data.content.slice(0,200)} heading={info.data.heading.slice(0,200)} pinNote={this.pinNote} noteId={this.noteId} deleteNote={this.deleteNote}/>
                            :''
                        ):''}
                    </div>
                    <div className='notes-flex-container unpinned'>
                        {this.state.notes.length>0 ? this.state.notes.map(info=>
                            !info.pinned?
                            <NotesContainer id={info.id} created={info.dateCreated} pinned={info.pinned} key={info.id} content={info.data.content.slice(0,200)} heading={info.data.heading.slice(0,200)} pinNote={this.pinNote} noteId={this.noteId} deleteNote={this.deleteNote}/>
                            :''
                        ):''}
                    </div>
                </div>
                {this.state.currentNoteId>100?<Note id={this.state.currentNoteId} popup={true} getHeading={this.setNewHeading} getContent={this.setNewContent} closeeditor={this.handlecloseeditor} /> :''}
            </div>
            </React.StrictMode>
        )
    }
}

export default NotesApp


  