import React, { useEffect,useState } from 'react'
export default function WeeksToLiveData(props){

    const[hoverdata,sethoverdata] = useState({year:0,week:0,id:0})
    const[hoverposition,sethoverposition] = useState({top:-100,left:-100})
    const[currentweeknote,setcurrentweeknote] = useState({year:0,week:0,id:0})
    const averagelifespan = 73
    const totalweeks= averagelifespan*52

    useEffect(()=>{
        var allweeks = document.getElementsByClassName('week')
        function weeks(){
            for (let i = 0; i < allweeks.length; i++) {
                allweeks[i].classList.remove('lived');
              }
            for(var i = 0; i < props.weeksToLive;i++){
                allweeks[i].classList.add('lived');
                allweeks[props.weeksToLive].classList.add('living')
            }
        }
        weeks()
    },[props.weeksToLive])

    var weekinfocontent = null;
    function weekinfo(e){
        weekinfocontent = e
    }

    function openWeekNote(e){
        setcurrentweeknote({id:parseInt(e.target.dataset.id),week:e.target.dataset.week,year:e.target.dataset.year})
    }

    function showWeekInfo(e){
            weekinfocontent.classList.remove('hidden')
            sethoverdata({year:e.target.parentNode.dataset.number||0,week:e.target.dataset.number||0,id:(e.target.parentNode.dataset.number).toString()+(e.target.dataset.number).toString()})
            sethoverposition({top:e.target.getBoundingClientRect().top - 12,left:e.target.getBoundingClientRect().left +12})
            
    }
    function saveNote(e){
        setcurrentweeknote({id:0,week:0,year:0})
    }
    return( 
    <React.Fragment>
    <div className='flex' >
    <TimeLineWeeksLeftInfo  weeksToLive ={props.weeksToLiveDecimal} weeksToLiveWhole={props.weeksToLive} totalweeks={totalweeks}/>
    <div className="weeks-container padding-30">
            {Array.from(Array(averagelifespan), (e, i) => {
                return <div className='year' key={i}  data-number={i}>
                {Array.from(Array(52), (e, k) => {
                    return (
                        <div className="week" key={k+1} data-number={k+1} onMouseOverCapture={showWeekInfo} >
                        </div>
                        )
                  })}
                </div>
            })}
    
    <div className='hovered-week-info' style={{top:hoverposition.top,left:hoverposition.left}} ref={weekinfo}>
        <div className='year-info'> Year: {hoverdata.year} </div>
        <div className='week-info'> Week: {hoverdata.week} </div>
        {/* <div className="week-content-add-button" data-year={hoverdata.year} data-week={hoverdata.week} data-id={hoverdata.id} onClick={openWeekNote}>Add Note</div> */}
    </div>
    </div>
    {/* <WeekNote saveNote={saveNote} id={currentweeknote.id} week={currentweeknote.week} year={currentweeknote.year}/> */}
    <div className='timeline-info-container'></div>
    </div>
    </React.Fragment>

    )
    
}


function TimeLineWeeksLeftInfo(props){
    return(
        <React.Fragment>
            <div className='flex'>
                <div className="info time-line-weeks-left-info padding-20 color-heading">
                    <div className="weeks-passed padding-10 color-heading">
                    Weeks Lived : <span className='weeks-lived color-heading'>{props.weeksToLive}</span><span>/{props.totalweeks}</span>
                    </div>
                    <div className="weeks-death  padding-10 color-heading">
                    Death in : <span className='color-heading'>{((props.totalweeks - props.weeksToLive).toString()).slice(0,(((props.weeksToLiveWhole).toString()).length)+5)}</span> weeks
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


function WeekNote(props){

    function saveNote(e){
        props.saveNote()
    }

        return(
            <div id="weekNoteContainer" className={ props.id>0 ?'weekNoteContainer active' : 'weekNoteContainer'}>
                <div className='week-name'>
                Year : {props.year} / Week :{props.week}
                </div>
                <div className='weekNote' suppressContentEditableWarning='true' contentEditable="true" aria-multiline="true" role="textbox" >
                    Add a Note!
                </div>
                <div className='saveNote' onClick={saveNote}>Save Note</div>

            </div>
        )
    
}

