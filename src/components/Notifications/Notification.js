import React, { useState } from 'react'
import styled from 'styled-components';



const Color = styled.div`
height: 10px;
background-color: ${props => props.inputColor};
`;


const Notification = (props) => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setintervalID] = useState(null);
    const handleStartTimer = () => {
        const id = setInterval(()=>{
            setWidth(prev => {
                if(prev < 100){
                    return prev + 0.5
                }
                clearInterval(id);
                return prev;
            });
        },20);
        
        setintervalID(id)
    }
    
    const handlePauseTimer = () => {
        clearInterval(intervalID)
    }
    const handleCloseNotification = () =>{
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATIION",
                id: props.id
            })
        }, 400);
    }
    
    
    React.useEffect(()=>{
        if (width === 100){
            handleCloseNotification();
        }
    }, [width])
    
    
    React.useEffect(()=>{
        handleStartTimer()
    },[])
    return (
        <div
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleStartTimer}
        className={`notification-item ${exit ? "exit" : ""}`}>
        <p>{props.message}</p>
        <Color inputColor={props.color} style={{width : `${width}%`}}></Color>
        </div>
        )
    }
    
    export default Notification