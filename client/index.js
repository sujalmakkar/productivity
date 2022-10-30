import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './components/TodoApp/TodoApp';
import StopWatchApp from './components/StopWatchApp/StopWatchApp';
import TimerApp from './components/TimerApp/TimerApp';
import NotesApp from './components/NotesApp/NotesApp';
import WeeksToLive from './components/WeeksToLive/WeeksToLive';
// import MusicApp from './components/MusicApp/MusicApp'
import DeadLineApp from './components/DeadLineApp/DeadLineApp';
import FutureLetterApp from './components/FutureLetterApp/FutureLetterApp';
import GoalsApp from './components/GoalsApp/GoalsApp';
import LogoutButton from './components/LogoutButton/LogoutButton';
import ripple from './components/effects/ripple';
import render from './components/scripts/index';
import addscore from './components/scripts/score';
import getWeek from './components/scripts/currentWeek';
import today_score from './components/scripts/todayScore';
import today_time from './components/scripts/todayTime';
import week_time from './components/scripts/weekTime';
import StopWatchDashboard from './components/StopWatchDashboard/StopWatch';

class DashBoardApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { score: 0, week: 0, todayscore: 0, todaytime: 0, weektime: 0 };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({ score: addscore(0) || 0 });
            this.setState({ todayscore: today_score(0) || 0 });
            this.setState({ todaytime: today_time(0) || 0, weektime: week_time(0) || 0 });
        }, 200);
    }
    render() {
        return React.createElement(
            'div',
            { id: 'DashBoardApp', className: 'app' },
            React.createElement(
                'div',
                { className: 'app-heading' },
                'This week\'s Overview'
            ),
            React.createElement(
                'div',
                { className: 'stats-container' },
                React.createElement(
                    'div',
                    { className: 'score-display' },
                    React.createElement(
                        'div',
                        { className: 'score-heading stat' },
                        React.createElement(
                            'span',
                            null,
                            'Current Week\'s Score'
                        ),
                        React.createElement(
                            'div',
                            null,
                            this.state.score,
                            React.createElement(
                                'span',
                                { className: 'tool-tip' },
                                React.createElement('img', { src: 'images/icons8-info-24.png' }),
                                React.createElement(
                                    'span',
                                    { className: 'tool-tip-text' },
                                    'Total score of current week. The more the score the more will be the texture of the blob shown below.'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'week-heading stat' },
                        React.createElement(
                            'span',
                            null,
                            'Time Logged this Week'
                        ),
                        React.createElement(
                            'div',
                            null,
                            this.state.weektime
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'today-score stat' },
                        React.createElement(
                            'span',
                            null,
                            'Today\'s Score'
                        ),
                        React.createElement(
                            'div',
                            null,
                            this.state.todayscore
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'today-score stat' },
                        React.createElement(
                            'span',
                            null,
                            'Time Logged today'
                        ),
                        React.createElement(
                            'div',
                            null,
                            this.state.todaytime
                        )
                    )
                )
            ),
            React.createElement('canvas', { id: 'webgl-blob' }),
            this.state.score < 1 ? React.createElement(
                'div',
                { className: 'hint' },
                React.createElement('img', { src: 'images/icons8-info-24.png' }),
                React.createElement(
                    'span',
                    { className: 'hint-text' },
                    'Log your work time here ,the more the time you spend the more points you will get, the more points you will get the more texture the above blob will have.'
                )
            ) : '',
            React.createElement(StopWatchDashboard, null)
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.state = { username: null };
    }

    componentDidMount() {
        ripple();
        fetch('./getData/profile', {
            method: 'GET',
            headers: { 'content-Type': 'application/json' }
        }).then(res => res.json()).then(data => {
            if (data.status == 302) {
                window.location.href = '/login';
            } else {
                this.setState({ username: data.username });
            }
        });
    }
    logout() {
        LogoutButton();
    }

    handleChange(e) {
        var link = e.target.dataset.link;

        var elements = [...document.getElementsByClassName('apps-display')];

        var buttons = [...document.getElementsByClassName('app-list')];

        var target = elements.filter(a => a.dataset.name == link);

        if (link != 'dashboard') {
            var blob = document.getElementById('webgl-blob');
            blob.style.display = ' none';
        } else {
            var blob = document.getElementById('webgl-blob');
            blob.style.display = 'block';
        }

        elements.forEach(a => a.classList.remove('active'));
        buttons.forEach(a => a.classList.remove('active'));

        e.target.classList.add('active');
        target[0].classList.add('active');

        new Masonry('.notes-flex-container.pinned', {
            itemSelector: '.note-container',
            isAnimated: true
        });

        new Masonry('.notes-flex-container.unpinned', {
            itemSelector: '.note-container',
            isAnimated: true
        });

        new Masonry('.dead-line-container', {
            itemSelector: '.dead-line',
            isAnimated: true
        });
    }

    render() {
        return React.createElement(
            'div',
            { id: 'page' },
            React.createElement('div', { className: 'noise' }),
            React.createElement(
                'div',
                { id: 'fixed-navbar' },
                React.createElement(
                    'div',
                    { className: 'logo-container' },
                    React.createElement(
                        'div',
                        { className: 'logo' },
                        'my',
                        React.createElement(
                            'span',
                            null,
                            ' '
                        ),
                        'workflow',
                        React.createElement(
                            'span',
                            null,
                            '.'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'profile' },
                    React.createElement('img', { src: 'https://img.icons8.com/fluency-systems-filled/48/157E7E/guest-male.png' }),
                    React.createElement(
                        'span',
                        { className: 'profile-name' },
                        this.state.username || 'profile-name',
                        ' '
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.logout },
                        'Logout'
                    )
                )
            ),
            React.createElement(
                'div',
                { id: 'App-container' },
                React.createElement(
                    'div',
                    { className: 'App-selector' },
                    React.createElement(
                        'ul',
                        { className: 'App-selector-list-container' },
                        React.createElement(
                            'li',
                            { className: 'app-list active ripple-effect', 'data-link': 'dashboard', onClick: this.handleChange, title: 'Dashboard' },
                            React.createElement('img', { src: 'images/icons8-dashboard-96.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'todos', onClick: this.handleChange, title: 'Todos' },
                            React.createElement('img', { src: 'images/icons8-tick-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'timeline', onClick: this.handleChange, title: 'Timeline' },
                            React.createElement('img', { src: 'images/icons8-week-view-96.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'goals', onClick: this.handleChange, title: 'Goals' },
                            React.createElement('img', { src: 'images/icons8-goal-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'notes', onClick: this.handleChange, title: 'Notes' },
                            React.createElement('img', { src: 'images/icons8-notes-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'deadlines', onClick: this.handleChange, title: 'Deadlines' },
                            React.createElement('img', { src: 'images/icons8-deadline-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'letters', onClick: this.handleChange, title: 'Letters' },
                            React.createElement('img', { src: 'images/icons8-paper-plane-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'timers', onClick: this.handleChange, title: 'Timers' },
                            React.createElement('img', { src: 'images/icons8-alarm-clock-100.png' })
                        ),
                        React.createElement(
                            'li',
                            { className: 'app-list ripple-effect', 'data-link': 'stopwatchs', onClick: this.handleChange, title: 'Stop Watch' },
                            React.createElement('img', { src: 'images/icons8-stopwatch-100.png' })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'current-app-display' },
                    React.createElement(
                        'div',
                        { id: 'App' },
                        React.createElement(
                            'div',
                            { className: 'apps-display active', 'data-name': 'dashboard' },
                            React.createElement(DashBoardApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'todos' },
                            React.createElement(TodoApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'timeline' },
                            React.createElement(WeeksToLive, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'goals' },
                            React.createElement(GoalsApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'deadlines' },
                            React.createElement(DeadLineApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'letters' },
                            React.createElement(FutureLetterApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'notes' },
                            React.createElement(NotesApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'timers' },
                            React.createElement(TimerApp, null)
                        ),
                        React.createElement(
                            'div',
                            { className: 'apps-display', 'data-name': 'stopwatchs' },
                            React.createElement(StopWatchApp, null)
                        )
                    )
                )
            )
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("contents"));
root.render(React.createElement(App, null));

$(function () {
    render(0);
});