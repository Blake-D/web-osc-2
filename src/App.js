import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
  
    useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);
  
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);
  
    return mousePosition;
  };

  const {x,y} = useMousePosition()

  var oscillatorX

  let oscX = {
    type: "sine",
    frequency: x,
    playing: false
  }

  const audioContext = new AudioContext()

  function PlayX(){
    if(oscX.playing){
      oscillatorX.stop()
      oscX.playing = false
    } else{
      oscillatorX = audioContext.createOscillator()
      oscillatorX.type = oscX.type
      oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
      oscillatorX.connect(audioContext.destination)
      oscillatorX.start()
      oscX.playing = true
    }
  }

  window.addEventListener("mousedown", PlayX)
  window.addEventListener("mouseup", PlayX)

  return (
    <div className="App">
      <div id="test-area"></div>
      <p>X is: {x}</p>
    </div>
  )
}

export default App