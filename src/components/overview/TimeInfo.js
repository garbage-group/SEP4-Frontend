import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../../styles/overview_css/Clock.css';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [is24HourFormat, setIs24HourFormat] = useState(false);
    const cityName = "Horsens";

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time) => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (!is24HourFormat) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            return `${hours}:${minutes}:${seconds} ${ampm}`;
        }

        // 24-hour format padding
        hours = hours < 10 ? '0' + hours : hours;
        return `${hours}:${minutes}:${seconds}`;
    };

    const toggleFormat = () => {
        setIs24HourFormat(!is24HourFormat);
    };

    return (
        <div className="clock-container">
            <div className="clock-face">
                <div className="time">{formatTime(currentTime)}</div>
                <div className="city-name">{cityName}</div><br />
                <Button variant="contained" onClick={toggleFormat} className="toggle-format">
                    {is24HourFormat ? '12-Hour Format' : '24-Hour Format'}
                </Button>
            </div>
        </div>
    );
};

export { Clock };