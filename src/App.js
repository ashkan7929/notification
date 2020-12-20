import React ,{useState } from 'react';
import './App.css';
import { useNotification } from './components/Notifications/NotificationProvider';
import iro from '@jaames/iro';

const colorPicker = new iro.ColorPicker('#picker');


function App() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useNotification();
  
  const handelNewNotification = () =>{
    dispatch ({
      message: inputValue,
      color: colorPicker.color.hexString,
    })
  }
  return (
    <div className="App">
    <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
    <button onClick={handelNewNotification}>add message</button>
    <div id="picker"></div>
    </div>
    );
  }
  
  export default App;
  