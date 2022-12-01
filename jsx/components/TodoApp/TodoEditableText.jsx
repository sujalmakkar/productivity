import React ,{useState} from 'react'

export default function TodoEditableText(props){

    const [Editable,setEditable] = useState(false)
    const [Values,setValues] = useState({})

    function handleEdit(e){
        setEditable(true)
        setTimeout(function() {
            e.target.focus();
        }, 0);
        setValues({id:e.target.dataset.id,element:e.target})
    }

    function handleBlur(){
        setEditable(false)
        var new_value = Values.element.innerText
        props.changeTodoText({id:Values.id,text:new_value})

    }

    function handleEditDone(e){
        if (e.key === "Enter") {
        setEditable(false)
        var new_value = Values.element.innerText
        props.changeTodoText({id:Values.id,text:new_value})
        }
    }

    return(
        <span suppressContentEditableWarning='true' title="double click to edit" className={`todo-text ${ Editable?'editable':'' }  ${props.todoDone ? 'done' : ''}`} data-id={props.todoId} onKeyDown={handleEditDone} contentEditable={Editable ? 'true' : 'false'} onBlur={handleBlur} onDoubleClick={handleEdit}>{props.todoText}</span> 
            )
}