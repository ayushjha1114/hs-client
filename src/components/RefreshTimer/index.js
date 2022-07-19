import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'

let RefreshTimer = props => {

    const { lastSync } = props;
    const hours = 0, minutes = 0, seconds = 0;

    const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

    const secondsToTime = (lastSync) => {
        let diff = (new Date().getTime() - lastSync.getTime()) / 1000;
        if (diff < 7200) {
            diff = 7200 - diff;
            let hours = Math.floor(diff / (60 * 60));
            let divisor_for_minutes = diff % (60 * 60);
            let minutes = Math.floor(divisor_for_minutes / 60);
            let divisor_for_seconds = divisor_for_minutes % 60;
            let seconds = Math.ceil(divisor_for_seconds);
            setTime([hours, minutes, seconds]);
            props.setTimerEnd(false);
        }
    };

    useEffect(() => {
        if (!lastSync) return;
        const lastRefresh = new Date(lastSync.toString());
        secondsToTime(lastRefresh);
    }, [lastSync]);

    useEffect(() => {
        const tick = () => {
            if (hrs === 0 && mins === 0 && secs === 0) {
                reset();
                props.setTimerEnd(true);
            } else if (mins === 0 && secs === 0) {
                setTime([hrs - 1, 59, 59]);
            } else if (secs === 0) {
                setTime([hrs, mins - 1, 59]);
            } else {
                setTime([hrs, mins, secs - 1]);
            }
        };

        const reset = () => {
            setTime([0, 0, 0]);
        };

        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    }, [hrs, mins, secs]);

    return (
        (hrs || mins || secs) ?
            <><p>Next sync in : &nbsp;<span style={{ color: '#1268B3' }}>{(hrs < 10 ? '0' + hrs : hrs) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs)}</span></p></> :
            <div style={{ color: '#1268B3' }}>Syncing now...</div>
    );
};

RefreshTimer = connect(() => ({
})
)(RefreshTimer);


export default RefreshTimer;
