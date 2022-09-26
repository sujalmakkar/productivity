import React, { useEffect, useState } from 'react';
export default function TimerForm(props) {

    const [Seconds, setSeconds] = useState('00');
    const [Minutes, setMinutes] = useState('00');
    const [Hours, setHours] = useState('00');

    useEffect(() => {
        var TimeSubmitted = {
            hours: Hours,
            minutes: Minutes,
            seconds: Seconds
        };
        props.setTimer(TimeSubmitted);
    }, [Seconds, Minutes, Hours]);
    function handleSeconds(e) {
        e.target.value = e.target.value.slice(0, 2);
        var seconds = e.target.value.length > 1 ? e.target.value : '0' + e.target.value;
        setSeconds(seconds);
    }
    function handleMinutes(e) {
        e.target.value = e.target.value.slice(0, 2);
        var minutes = e.target.value.length > 1 ? e.target.value : '0' + e.target.value;
        setMinutes(minutes);
    }
    function handleHours(e) {
        e.target.value = e.target.value.slice(0, 2);
        var hours = e.target.value.length > 1 ? e.target.value : '0' + e.target.value;
        setHours(hours);
    }
    function handleName(e) {
        props.setName(e.target.value);
    }

    return React.createElement(
        'div',
        { className: 'timer-forms-container' },
        React.createElement(
            'form',
            null,
            React.createElement('input', { type: 'text', name: 'name', onInput: handleName, placeholder: 'Task Name' })
        ),
        React.createElement(
            'form',
            null,
            React.createElement('input', { type: 'number', name: 'hours', onInput: handleHours, placeholder: 'HH' }),
            React.createElement('input', { type: 'number', name: 'minutes', onInput: handleMinutes, placeholder: 'MM' }),
            React.createElement('input', { type: 'number', name: 'seconds', onInput: handleSeconds, placeholder: 'SS' })
        )
    );
}