import React, { createContext, useContext, useReducer, useState } from 'react'
import {v4} from 'uuid'
import Notification from './Notification';

const NotificationContext = createContext();



const NotificationProvider = (props) => {
    const [radiovalue, setRadioValue] = useState("top-right")
    const [state, dispatch] = useReducer((state, action)=>{
        switch (action.type) {
            case "ADD_NOTIFICATION":
            return [...state, {...action.payload}];
            break;
            case "REMOVE_NOTIFICATIION":
            return state.filter(el=> el.id !== action.id );
            break;
            default:
            return state;
        }       
    },[]);
    
    return (
        <NotificationContext.Provider value={dispatch}>
        <div className={`notification-wrapper ${radiovalue}`}>
        {state.map(note => {
            return <Notification dispatch={dispatch} key={note.id} {...note}/>
        })}
        </div>
        {props.children}
        <div className={"radios"} value={radiovalue} onChange={e => setRadioValue(e.target.value)}>
        <input value={"top-right"} type="radio" name="1" defaultChecked/> top-right
        <input value={"top-left"} type="radio" name="1"/> top-left
        <input value={"bottom-right"} type="radio" name="1"/> bottom-right
        <input value={"bottom-left"} type="radio" name="1"/> bottom-left
        </div>

        </NotificationContext.Provider>
        )
    }
    export const useNotification = () => {
        const dispatch = useContext(NotificationContext);
        
        return (props) => {
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    id: v4(),
                    ...props
                }
            })
        }
    };
    
    export default NotificationProvider