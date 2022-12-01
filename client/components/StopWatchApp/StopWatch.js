import React, { useState, useEffect } from 'react';

export default function StopWatch(props) {

    const [stopWatchName, setstopWatchName] = useState('');
    const [stopWatchTime, setstopWatchTime] = useState({ timepassed: 0, milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 });
    const [stopWatchInfo, setstopWatchInfo] = useState({ started: false, initiated: false });
    const [stopWatchStartTime, setstopWatchStartTime] = useState(0);
    const [stopWatchPauseTime, setstopWatchPauseTime] = useState(0);
    const [timerInitialized, settimerInitialized] = useState('');

    useEffect(() => {
        if (stopWatchInfo.initiated) {
            var started = Date.now();

            if (stopWatchStartTime == 0) {
                setstopWatchStartTime(started);
            }

            var totalsecondspassed = 0,
                timepassedstring = 0,
                timepassed = 0,
                milliseconds = 0,
                seconds = 0,
                minutes = 0,
                hours = 0,
                days = 0,
                months = 0,
                years = 0;
            var secondstext = '',
                minutestext = '',
                hourstext = '',
                daystext = '',
                monthstext = '',
                yearstext = '';
            if (stopWatchInfo.started) {
                var intervalID = setInterval(() => {
                    timepassed = Date.now() - stopWatchStartTime - stopWatchPauseTime;

                    timepassedstring = timepassed.toString();

                    milliseconds = timepassedstring.slice(-3, -2);

                    totalsecondspassed = timepassedstring.slice(0, -3);

                    seconds = totalsecondspassed % 60;
                    minutes = totalsecondspassed / 60;
                    hours = minutes / 60;
                    days = hours / 24;
                    months = days / 30;
                    years = months / 12;

                    secondstext = ('0' + seconds).slice(-2);
                    minutestext = ('0' + Math.trunc(minutes - Math.trunc(hours) * 60)).slice(-2);
                    hourstext = ('0' + Math.trunc(hours - Math.trunc(days) * 24)).slice(-2);
                    daystext = ('0' + Math.trunc(days - Math.trunc(months) * 24)).slice(-2);
                    monthstext = ('0' + Math.trunc(months - Math.trunc(years) * 24)).slice(-2);
                    yearstext = ('0' + Math.trunc(months / 12)).slice(-2);

                    var stopWatchTimeJson = { timepassed: timepassed, milliseconds: milliseconds };

                    parseInt(secondstext) > 0 ? stopWatchTimeJson.seconds = secondstext : '';
                    parseInt(minutestext) > 0 ? stopWatchTimeJson.minutes = minutestext : '';
                    parseInt(hourstext) > 0 ? stopWatchTimeJson.hours = hourstext : '';
                    parseInt(daystext) > 0 ? stopWatchTimeJson.days = daystext : '';
                    parseInt(monthstext) > 0 ? stopWatchTimeJson.months = monthstext : '';

                    setstopWatchTime(stopWatchTimeJson);
                }, 100);
            }
        }
        return () => clearInterval(intervalID);
    }, [stopWatchInfo, stopWatchStartTime]);

    useEffect(() => {
        if (!stopWatchInfo.started && stopWatchInfo.initiated) {
            var sleeptimestarted = Date.now();
            var intervalID = setInterval(() => {
                var totalsleeptime = Date.now() - sleeptimestarted;
                setstopWatchPauseTime(stopWatchPauseTime + totalsleeptime);
            }, 100);
        }
        return () => clearInterval(intervalID);
    }, [stopWatchInfo]);

    function start(e) {
        e.preventDefault();
        setstopWatchInfo({ started: true, initiated: true });
        if (timerInitialized.length > 1) {
            '';
        } else {
            const currentDate = new Date();

            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

            var time = currentDate.getHours() + ':' + currentDate.getMinutes() + ' ' + currentDate.toLocaleDateString('en-us', options);
            settimerInitialized(time);
        }
    }

    function pause() {
        if (stopWatchInfo.started) {
            setstopWatchInfo({ started: false, initiated: true });
        }
    }
    function handletaskname(e) {

        var name = e.target.value;
        setstopWatchName(name);
    }
    function save() {
        setstopWatchInfo({ started: false, initiated: false });
        setstopWatchStartTime(0);
        setstopWatchPauseTime(0);
        settimerInitialized('');
        var infoToBeSaved = {};
        infoToBeSaved.time = (stopWatchTime.months ? stopWatchTime.months + 'M' : '') + (stopWatchTime.days ? stopWatchTime.days + 'D' : '') + (stopWatchTime.hours ? stopWatchTime.hours + ':' : '00:') + (stopWatchTime.minutes ? stopWatchTime.minutes : '00') + ':' + (stopWatchTime.seconds ? stopWatchTime.seconds : '00') + '.' + stopWatchTime.milliseconds;
        infoToBeSaved.taskName = stopWatchName;
        infoToBeSaved.initialized = timerInitialized;
        props.addLog(infoToBeSaved);
        setstopWatchTime({ timepassed: 0, milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 });
        setstopWatchName('');
    }
    function reset() {
        settimerInitialized('');
        setstopWatchName('');
        setstopWatchInfo({ started: false, initiated: false });
        setstopWatchStartTime(0);
        setstopWatchPauseTime(0);
        setstopWatchTime({ timepassed: 0, milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 });
    }

    return React.createElement(
        'div',
        { className: 'stop-watch' },
        React.createElement(
            'form',
            { onSubmit: start },
            React.createElement('input', { maxLength: 200, onChange: handletaskname, type: 'text', placeholder: 'enter task name' })
        ),
        React.createElement(
            'div',
            { className: 'stop-watch-name-display' },
            stopWatchName.length > 0 ? stopWatchName : 'untitled'
        ),
        React.createElement(
            'div',
            { className: 'stop-watch-time-display' },
            React.createElement(
                'div',
                { className: 'stop-watch-display' },
                React.createElement(
                    'div',
                    { className: 'time' },
                    React.createElement(
                        'div',
                        { className: 'time-number' },
                        stopWatchTime.hours ? stopWatchTime.hours : '00'
                    ),
                    React.createElement(
                        'div',
                        { className: 'time-text' },
                        'Hours'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'time-break' },
                    ':'
                ),
                React.createElement(
                    'div',
                    { className: 'time' },
                    React.createElement(
                        'div',
                        { className: 'time-number' },
                        stopWatchTime.minutes ? stopWatchTime.minutes : '00'
                    ),
                    React.createElement(
                        'div',
                        { className: 'time-text' },
                        'Minutes'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'time-break' },
                    ':'
                ),
                React.createElement(
                    'div',
                    { className: 'time' },
                    React.createElement(
                        'div',
                        { className: 'time-number' },
                        stopWatchTime.seconds ? stopWatchTime.seconds : '00'
                    ),
                    React.createElement(
                        'div',
                        { className: 'time-text' },
                        'Seconds'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'time-break' },
                    '.'
                ),
                React.createElement(
                    'div',
                    { className: 'time' },
                    React.createElement(
                        'div',
                        { className: 'time-number' },
                        stopWatchTime.milliseconds ? stopWatchTime.milliseconds : 0
                    ),
                    React.createElement(
                        'div',
                        { className: 'time-text' },
                        'MilliS'
                    )
                )
            )
        ),
        stopWatchInfo.started ? React.createElement(
            'div',
            { className: 'stop-watch-button-container' },
            React.createElement(
                'button',
                { onClick: pause },
                'pause'
            ),
            React.createElement(
                'button',
                { onClick: reset },
                'reset'
            ),
            React.createElement(
                'button',
                { onClick: save },
                'save'
            )
        ) : stopWatchTime.timepassed > 1 ? React.createElement(
            'div',
            { className: 'stop-watch-button-container' },
            React.createElement(
                'button',
                { onClick: start },
                'Resume'
            ),
            React.createElement(
                'button',
                { onClick: reset },
                'reset'
            ),
            React.createElement(
                'button',
                { onClick: save },
                'save'
            )
        ) : React.createElement(
            'div',
            { className: 'stop-watch-button-container' },
            React.createElement(
                'button',
                { type: 'submit', onClick: start },
                'start'
            )
        )
    );
}