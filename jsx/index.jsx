import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoApp from './components/TodoApp/TodoApp'
import StopWatchApp from './components/StopWatchApp/StopWatchApp'
import TimerApp from './components/TimerApp/TimerApp'
import NotesApp from './components/NotesApp/NotesApp'
import WeeksToLive from './components/WeeksToLive/WeeksToLive'
// import MusicApp from './components/MusicApp/MusicApp'
// import DeadLineApp from './components/DeadLineApp/DeadLineApp'
import FutureLetterApp from './components/FutureLetterApp/FutureLetterApp'
import GoalsApp from './components/GoalsApp/GoalsApp'
import LogoutButton from './components/LogoutButton/LogoutButton'
import ripple from './components/effects/ripple'
import render from './components/scripts/index'
import addscore from './components/scripts/score'
import getWeek from './components/scripts/currentWeek'
import today_score from './components/scripts/todayScore'
import today_time from './components/scripts/todayTime'
import week_time from './components/scripts/weekTime'
import StopWatchDashboard from './components/StopWatchDashboard/StopWatch'

  


class DashBoardApp extends React.Component{
    constructor(props){
        super(props)
        this.state= {score:0,week:0,todayscore:0,todaytime:0,weektime:0}
    }
    componentDidMount(){
        setInterval(()=>{
            this.setState({score:addscore(0)||0})
            this.setState({todayscore:today_score(0)||0})
            this.setState({todaytime:today_time(0)||0,weektime:week_time(0)||0})
        },200)
    }
    render(){
        return(
            <div id="DashBoardApp" className="app">
                    <div className="app-heading">This week's Overview</div>
                    <div className="stats-container">
                    <div className="score-display">
                        <div className="score-heading stat">
                            <span>Current Week's Score</span>
                            <div>{this.state.score}     
                            <span className="tool-tip">
                            <img src="images/icons8-info-24.png"/>
                            <span className='tool-tip-text'>
                                Total score of current week. The more the score the more will be the texture of the blob shown below.
                            </span>
                            </span> 
                            </div>
                        </div>
                        <div className='week-heading stat'>
                            <span>Time Logged this Week</span>
                            <div>{this.state.weektime}</div>    
                        </div>
                        <div className='today-score stat'>
                            <span>Today's Score</span>
                            <div>{this.state.todayscore}</div>    
                        </div>
                        <div className='today-score stat'>
                            <span>Time Logged today</span>
                            <div>{this.state.todaytime}</div>    
                        </div>
                    </div>
                </div>  
                <canvas id="webgl-blob"></canvas>
                {this.state.score < 1? 
                <div className='hint'>
                        <img src="images/icons8-info-24.png"/>
                        <span className='hint-text'>Log your work time here ,the more the time you spend the more points you will get, the more points you will get the more texture the above blob will have.</span>
                </div>
                :''
                }
                <StopWatchDashboard/>
            </div>
        )
    }
}



class App extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.logout = this.logout.bind(this)
        this.state = {username:null}

    }

    componentDidMount(){
        ripple()
        fetch('./getData/profile',{
            method:'GET',
            headers:{'content-Type':'application/json'}
        }).then(res=>res.json()).then(data=>{
            if(data.status == 302){
                window.location.href = '/login'
            }else{
                this.setState({username:data.username})
            }
        })

    }
    logout(){
        LogoutButton()
    }

    handleChange(e){
        var link = e.target.dataset.link
        
        var elements = [...document.getElementsByClassName('apps-display')]

        var buttons = [...document.getElementsByClassName('app-list')]

        var target = elements.filter(a=>a.dataset.name == link)

        if(link != 'dashboard'){
            var blob = document.getElementById('webgl-blob')
            blob.style.display = ' none'
        }else{
            var blob = document.getElementById('webgl-blob')
            blob.style.display = 'block'
        }
        
        elements.forEach(a=>a.classList.remove('active'))
        buttons.forEach(a=>a.classList.remove('active'))

        e.target.classList.add('active')
        target[0].classList.add('active')

        new Masonry( '.notes-flex-container.pinned', { 
            itemSelector: '.note-container',
            isAnimated: true
        })

        new Masonry( '.notes-flex-container.unpinned', { 
            itemSelector: '.note-container',
            isAnimated: true
        })

        // new Masonry( '.dead-line-container', { 
        //     itemSelector: '.dead-line',
        //     isAnimated: true
        // })
    }

    render(){
        return(
        <div id="page">
            <div className="noise"></div>
            <div id="fixed-navbar">
               <div className='logo-container'>
                <div className="logo">my<span> </span>workflow<span>.</span></div> 
                </div>
                <div className="profile">
                <img src="https://img.icons8.com/fluency-systems-filled/48/157E7E/guest-male.png"/>
                <span className='profile-name'>{this.state.username || 'profile-name'} </span>

                <button onClick={this.logout}>Logout</button>
                
                </div> 
            </div>
            <div id="App-container">
                <div className="App-selector">
                    <ul className='App-selector-list-container'>
                    <li className='app-list active ripple-effect' data-link="dashboard" onClick={this.handleChange}  title="Dashboard">
                        <img src="images/icons8-dashboard-96.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="todos" onClick={this.handleChange}  title="Todos">
                        <img src="images/icons8-tick-100.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="timeline" onClick={this.handleChange}  title="Timeline">
                        <img src="images/icons8-week-view-96.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="goals" onClick={this.handleChange}  title="Goals">
                        <img src="images/icons8-goal-100.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="notes" onClick={this.handleChange}  title="Notes">
                        <img src="images/icons8-notes-100.png"/>
                    </li>
                    {/* <li className='app-list ripple-effect' data-link="deadlines" onClick={this.handleChange}  title="Deadlines">
                    <img src="images/icons8-deadline-100.png"/>
                    </li> */}
                    <li className='app-list ripple-effect' data-link="letters" onClick={this.handleChange}  title="Letters">
                        <img src="images/icons8-paper-plane-100.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="timers" onClick={this.handleChange}  title="Timers">
                        <img src="images/icons8-alarm-clock-100.png"/>
                    </li>
                    <li className='app-list ripple-effect' data-link="stopwatchs" onClick={this.handleChange} title="Stop Watch">
                        <img src="images/icons8-stopwatch-100.png"/>
                    </li>
                    </ul>

                </div>
                <div id='current-app-display'>
                <div id="App">
                    <div className="apps-display active" data-name="dashboard"><DashBoardApp/></div>
                    <div className="apps-display" data-name="todos"><TodoApp/></div>
                    <div className="apps-display" data-name="timeline" ><WeeksToLive/></div>
                    <div className="apps-display" data-name="goals"><GoalsApp/></div>
                    {/* <div className="apps-display" data-name="deadlines"><DeadLineApp/></div> */}
                    <div className="apps-display" data-name="letters"><FutureLetterApp/></div>
                    <div className="apps-display" data-name="notes"><NotesApp/></div>
                    <div className="apps-display" data-name="timers"><TimerApp/></div>
                    <div className="apps-display" data-name="stopwatchs"><StopWatchApp/></div>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("contents"));
root.render(<App/>)

$(function(){
    render(0)
})
