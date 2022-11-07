import React,{useEffect,useState,useRef,Component} from 'react'

import {io} from 'socket.io-client'


var socket = io("https://myworkflow.space:443");
// var socket = io("localhost:80");

export default function Note(props){

    const [headingdata,setheadingdata] = useState('')
    const [contentdata,setcontentdata] = useState('')
    const [currentplace,setcurrentplace] = useState('content')

    const fetchstate = useRef(true)

    useEffect(()=>{

        if(fetchstate.current){
            try{
                fetch(`./getData/note/${props.id}`,{
                    method:'GET',
                    headers:{'content-Type':'application/json'}            
                }).then(res=>res.json()).then(result=>{
    

    
                    setcontentdata(result?result[0]?result[0].data?result[0].data.content:'Content Here!':'Content Here!':'Content Here!')
                    setheadingdata(result?result[0]?result[0].data?result[0].data.heading:'Heading here!':'Heading here!':'Heading here!')
    
                    Heading.innerHTML= result?result[0]?result[0].data?result[0].data.heading:'Heading here!':'Heading here!':'Heading here!'
                    Content.innerHTML= result?result[0]?result[0].data?result[0].data.content:'Content Here!':'Content Here!':'Content Here!'
    
                })   
            }catch(err){
                console.log(err)
            }finally{
                Heading.innerHTML= 'Heading here!'
                Content.innerHTML= 'Content Here!'
            }
            return () =>{
                fetchstate.current = false
            }
        } 
    },[])

    useEffect(()=>{
        if(fetchstate.current){
        var noteHeading = $('.note-heading')[0]

        noteHeading?noteHeading.addEventListener('paste', function (e) {
            // Prevent the default action
            e.preventDefault();
        
            // Get the copied text from the clipboard
            const text = e.clipboardData
                ? (e.originalEvent || e).clipboardData.getData('text/plain')
                : // For IE
                window.clipboardData
                ? window.clipboardData.getData('Text')
                : '';
        
            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                // Insert text at the current position of caret
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();
        
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);
        
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }):''

        var noteContent = $('.note-content')[0]

        noteContent?noteContent.addEventListener('paste', function (e) {
            // Prevent the default action
            e.preventDefault();
        
            // Get the copied text from the clipboard
            const text = e.clipboardData
                ? (e.originalEvent || e).clipboardData.getData('text/plain')
                : // For IE
                window.clipboardData
                ? window.clipboardData.getData('Text')
                : '';
        
            if (document.queryCommandSupported('insertText')) {
                document.execCommand('insertText', false, text);
            } else {
                // Insert text at the current position of caret
                const range = document.getSelection().getRangeAt(0);
                range.deleteContents();
        
                const textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.selectNodeContents(textNode);
                range.collapse(false);
        
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }):''
        return () =>{
            fetchstate.current = false
        }
    } 
    },[])
    var Heading = null ;
    function headingref(e){
        Heading = e
    }


    var Content = null ;
    function contentref(e){
        Content = e
    }

    function handleContent(e){
        setcontentdata(Content.innerHTML)
        var max = false;
        (Content.innerHTML).length > 200 ? max=true : max=false
        props.getContent((Content.innerHTML).slice(0,200)+(max?'...':''))
    }

    function handleHeading(e){
        setheadingdata(Heading.innerHTML)
        var max = false;
        (Heading.innerHTML).length > 200 ? max=true : max=false
        props.getHeading((Heading.innerHTML).slice(0,200)+(max?'...':''))
    }
    

    function handlenote(e){
        var current = e.target.dataset.name
        if(!current){
            current = e.target.parentElement.dataset.name
        }
        setcurrentplace(current)
    }

    function addlist(){
        if(currentplace === 'content'){
            Content.innerHTML = contentdata + `<ul class="note-list-container"><li class="note-list">this is a list</li></ul><br>`
            setcontentdata(Content.innerHTML)
        } else if(currentplace === 'heading'){
            Heading.innerHTML = headingdata + `<ul class="note-list-container"><li class="note-list">this is a list</li></ul><br>` 
            setheadingdata(Heading.innerHTML)
            
        }
    }

    function uploadImage(e){
    
        var myWidget = window.cloudinary.createUploadWidget(
            {
              cloudName: 'dvi0cfuem',
              uploadPreset: 'ml_default',
              multiple: false,
              maxFileSize:10000000,
              clientAllowedFormats:["jpg", "gif", "png","webp","jpeg"]
            },
            (error, result) => {
                console.log(result)
              if (!error && result && result.event === "success") {
                if(currentplace === 'content'){
                    Content.innerHTML = contentdata + `<img data-name='content' src=${result.info.secure_url}><br>`
                    setcontentdata(Content.innerHTML)
                    saveEarly()
                } else if(currentplace === 'heading'){
                    Heading.innerHTML = headingdata + `<img data-name='heading' src=${result.info.secure_url}><br>`
                    setheadingdata(Heading.innerHTML)
                    saveEarly()
                }
              }
            }
    );
    myWidget.open();
    }

    function saveEarly(){
        var contentHTML = contentdata
        var headingHTML = headingdata
        socket.emit('noteedit',{
            id:props.id,
            data:{
                heading:headingHTML,
                content:contentHTML
            }
        })
        console.log('edited')
    }

    useEffect(() => {
        var contentHTML = contentdata
        var headingHTML = headingdata
        const delayDebounceFn = setTimeout(() => {
            socket.emit('noteedit',{
                id:props.id,
                data:{
                    heading:headingHTML,
                    content:contentHTML
                }
            })
        }, 2000)
    
        return () => clearTimeout(delayDebounceFn)
      }, [headingdata,contentdata])

      function closeeditor(e){
        var contentHTML = contentdata
        var headingHTML = headingdata
        socket.emit('noteedit',{
            id:props.id,
            data:{
                heading:headingHTML,
                content:contentHTML
            }
        })
        props.closeeditor()
      }

    return(
        <div  className={props.popup ? 'note popup box-shadow' : 'note box-shadow'} data-id={props.id}>

            <div className="note-contents-container">

                <div className='note-text-container' onKeyDown={handlenote} onClick={handlenote}>
                <div className="note-heading text-container"  ref={headingref} data-name="heading" data-id={props.id} suppressContentEditableWarning='true' contentEditable="true" aria-multiline="true" role="textbox" onKeyDown={handleHeading} onKeyUp={handleHeading} onClick={handleHeading}>
                </div>

                <div className="note-content text-container" ref={contentref} data-name='content' data-id={props.id} suppressContentEditableWarning='true' contentEditable="true" aria-multiline="true" role="textbox" onKeyDown={handleContent} onKeyUp={handleContent} onClick={handleContent}></div>
                </div>
            </div>
            <div className='note-tools-container'>
                    <div className='note-tools'>
                        <div className='note-tool'>
                            <button type="button" onClick={uploadImage}>
                            <img src="https://img.icons8.com/material-rounded/96/000000/add-image.png"/>
                            </button>

                            {/* </label> */}
                        </div>
                        <div className='note-tool'>
                            <button type="button" onClick={addlist}>
                            <img src="https://img.icons8.com/material-outlined/96/000000/list.png"/>
                            </button>
                        </div>
                    </div>
                    <div className="note-close" onClick={closeeditor} onMouseOver={saveEarly}>
                    <img src="https://img.icons8.com/material-outlined/96/000000/delete-sign.png"/>
                    </div>
            </div>
        </div>
    )
}