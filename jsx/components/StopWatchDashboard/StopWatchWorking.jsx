import React ,{useState,useEffect,useRef} from 'react'
import addscore from '../scripts/score'
import getWeek from '../scripts/currentWeek'
import today_score from '../scripts/todayScore'
import today_time from '../scripts/todayTime'
import week_time from '../scripts/weekTime'
import set_status from '../scripts/workstatus'
import setstatus from '../scripts/workstatus'
const song = new Audio('./sound/3.mp3')


export default function StopWatch(props){

    const [stopWatchTime,setstopWatchTime] = useState({timepassed:0,milliseconds:0,seconds:0,minutes:0,hours:0,days:0,months:0,years:0})
    const [stopWatchInfo,setstopWatchInfo] = useState({started:false,initiated:false})
    const [stopWatchStartTime,setstopWatchStartTime] = useState(0)
    const [stopWatchPauseTime,setstopWatchPauseTime] = useState(0)
    const [timerInitialized,settimerInitialized] = useState('')
    const [timetosend,settimetosend] = useState({minutes:0,hours:0,seconds:0,timepassed:0})
    const [scoreToAdd,setscoreToAdd] = useState(2)
    const [date,setdate] = useState()
    const [ifreset,setifreset] = useState(false)

    const fetchstate = useRef(true)


    useEffect(()=>{
        if(fetchstate.current){
            const currentDate = new Date();

            const currentWeek = currentDate.getWeek() + '-'+ currentDate.getFullYear()

            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    
            var date = currentDate.toLocaleDateString('en-us', options) 
    
            var split = date.split('/')
            var today = split[0]+'-'+split[1]+'-'+split[2]
            
            fetch(`./getData/time/${currentWeek}/${today}`,{
                method:'GET',
                headers:{'content-Type':'application/json'}
            }).then(res=>res.json()).then(data=>{
                var timepassedstring = data.timepassed.toString()
                var totalsecondspassed = timepassedstring.slice(0,-3)
                var seconds = totalsecondspassed%60
                var minutes = totalsecondspassed/60
                var hours = minutes/60
                var days = hours/24
                var minutestext = ('0'+(Math.trunc(minutes-(Math.trunc(hours)*60)))).slice(-2)
                var hourstext = ('0'+(Math.trunc(hours-(Math.trunc(days)*24)))).slice(-2)
                var data2 = {minutes:parseInt(minutestext),hours:parseInt(hourstext),seconds:seconds,timepassed:parseInt(data.timepassed)}
                setstopWatchTime(data2)
                settimetosend(data2)
                today_score(data2.timepassed)
                today_time(data2.timepassed)
                week_time(data2.timepassed)
                setstopWatchInfo({started:false,initiated:true})
            })
            return () =>{
                fetchstate.current = false
            }
        }

    },[])

    useEffect(()=>{
        if(ifreset){
            var data = {minutes:parseInt(stopWatchTime.minutes),seconds:parseInt(stopWatchTime.seconds),hours:parseInt(stopWatchTime.hours),timepassed:parseInt(stopWatchTime.timepassed)}
            settimetosend(data)
            reset()
            start()
        }
    },[ifreset])

    useEffect(() => {
        if(stopWatchInfo.initiated){
            var started = Date.now()

            if(stopWatchStartTime==0){
                setstopWatchStartTime(started - stopWatchTime.timepassed)
            }
    
            var totalsecondspassed = 0,timepassedstring = 0,timepassed = 0,seconds = 0,minutes = 0,hours = 0,days = 0,months= 0,years = 0 
            var secondstext = '', minutestext ='' , hourstext = ''
            if(stopWatchInfo.started ){
            var intervalID = setInterval(()=>{
                        timepassed = Date.now() - stopWatchStartTime - stopWatchPauseTime

                        var todaydate = new Date()
                        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                        var today = todaydate.toLocaleDateString('en-us', options) 

                        if(today!==timerInitialized){
                            setifreset(true)
                        }   
                        
                        timepassedstring = timepassed.toString()
            
                        totalsecondspassed = timepassedstring.slice(0,-3)
            
                        seconds = totalsecondspassed%60
                        minutes = totalsecondspassed/60
                        hours = minutes/60
                        days = hours/24
                        months = days/30
                        years = months/12
            
                        secondstext = (('0'+seconds)).slice(-2)
                        minutestext = ('0'+(Math.trunc(minutes-(Math.trunc(hours)*60)))).slice(-2)
                        hourstext = ('0'+(Math.trunc(hours-(Math.trunc(days)*24)))).slice(-2)


                        if(hours>9){
                            setscoreToAdd(5)
                            
                        } else if(hours>6){
                            setscoreToAdd(4)
                            
                        } else if(hours>3){
                            setscoreToAdd(3)
                        }
                        today_time(timepassed)
                        week_time(timepassed)
                        var stopWatchTimeJson={timepassed:timepassed}
    
                        parseInt(secondstext)>0?stopWatchTimeJson.seconds = secondstext : ''
                        parseInt(minutestext)>0?stopWatchTimeJson.minutes = minutestext : ''
                        parseInt(hourstext)>0?stopWatchTimeJson.hours = hourstext : ''
                    
                        setstopWatchTime(stopWatchTimeJson);
                        var data = {minutes:parseInt(minutestext),seconds:seconds,hours:parseInt(hourstext),timepassed:timepassed}
                            if(timetosend.minutes != data.minutes){
                                settimetosend(data)
                                var scorebyminute = parseFloat((scoreToAdd/60))
                                console.log(stopWatchTime.timepassed)
                                addscore(scorebyminute,stopWatchTime.timepassed)
                                today_score(stopWatchTime.timepassed)
                                song.play(); 
                            }
            },200)
        }
        }
        return () => clearInterval(intervalID);
    
    }, [stopWatchInfo,stopWatchStartTime,timetosend,scoreToAdd,stopWatchTime]);

    useEffect(()=>{
        if(stopWatchInfo.initiated){
        const currentDate = new Date();

        const currentWeek = currentDate.getWeek() + '-'+ currentDate.getFullYear()

        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        var date = currentDate.toLocaleDateString('en-us', options) 

        var split = date.split('/')
        var today = split[0]+'-'+split[1]+'-'+split[2]

        setdate(currentDate)
        
        var data = {timepassed:timetosend.timepassed,date:today,week:currentWeek}

        fetch(`./postData/time/set`,{
            method:'POST',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(data=>{
            null
        })
    }
    },[timetosend])


    useEffect(() => {
        if(!stopWatchInfo.started && stopWatchInfo.initiated){
            var sleeptimestarted = Date.now(); 
            var intervalID = setInterval(()=>{
                var totalsleeptime = Date.now() - sleeptimestarted 
                setstopWatchPauseTime(stopWatchPauseTime+totalsleeptime)
            },200)
        }
        return () => clearInterval(intervalID)
    
    }, [stopWatchInfo]);




    function start(){
        setstopWatchInfo({started:true,initiated:true})
        if(timerInitialized.length > 1){''}else{
            const currentDate = new Date();

            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    
            var time = currentDate.toLocaleDateString('en-us', options) 
            settimerInitialized(time)
            setstatus(1)
        } 
        setstatus(1)
    }

    function pause(){
        if(stopWatchInfo.started){
            setstopWatchInfo({started:false,initiated:true})
            var data = {minutes:parseInt(stopWatchTime.minutes)>0?parseInt(stopWatchTime.minutes):0,hours:parseInt(stopWatchTime.hours)>0?parseInt(stopWatchTime.hours):0,seconds:stopWatchTime.seconds,timepassed:stopWatchTime.timepassed}
            settimetosend(data)
            setstatus(2)
        }
    }

    function reset(){
            settimerInitialized('') 
            setstopWatchInfo({started:false,initiated:false})
            setstopWatchStartTime(0)
            setstopWatchPauseTime(0)
            setstopWatchTime({timepassed:0,milliseconds:0,seconds:0,minutes:0,hours:0,days:0})
            settimetosend({timepassed:0,milliseconds:0,seconds:0,minutes:0,hours:0,days:0})

    }

    return(
        <div className="stop-watch">

            <div className='stop-watch-time-display'>

            <div className='stop-watch-display'>
                <div className="time">
                    <div className="time-number">{stopWatchTime.hours?("0"+stopWatchTime.hours).slice(-2):'00'}</div>
                </div>
                <div className="time-break">:</div>
                <div className="time">
                    <div className="time-number">{stopWatchTime.minutes?("0"+stopWatchTime.minutes).slice(-2):'00'}</div>
                </div>
                <div className="time-break">:</div>
                <div className="time">
                    <div className="time-number">{stopWatchTime.seconds ? ("0"+stopWatchTime.seconds).slice(-2) : '00'}</div>
                </div>
        </div>
               
            </div>

            {stopWatchInfo.started
            ?
            <div className="stop-watch-button-container">

                <button onClick={pause}>pause</button>
            </div>
             :
             stopWatchTime.timepassed > 1 ?
                
                <div className="stop-watch-button-container">
                    <button onClick={start}>Resume</button>
                </div>
            :
                <div className="stop-watch-button-container">
                    <button type='submit' onClick={start} >start</button>
                </div>
            }


        </div>
    )
}