import './App.css'
import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"

function useMouse(){
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null
  })

  useEffect(() => {
    function handle(e){
      setMousePosition({
        x: e.pageX
        // y: e.pageY
      })
    }
    document.addEventListener("mousemove", handle)
    return () => document.removeEventListener("mousemove", handle)
  })

  return mousePosition

}


function App() {

  const {x, y} = useMouse()

  var oscillatorX

  let oscX = {
    type: "sine",
    frequency: useMouse(),
    playing: false
  }

  var audioContext = new AudioContext()

  function playX(){
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

  function changeSquare(){
    playX()
    oscX.type = "square"
    playX()
  }

  function changeSine(){
    playX()
    oscX.type = "sine"
    playX()
  }

  function changeSawtooth(){
    playX()
    oscX.type = "sawtooth"
    playX()
  }

  function changeTriangle(){
    playX()
    oscX.type = "triangle"
    playX()
  }

  function changeFreq(){
    playX()
    oscX.frequency = useMouse
    playX()
  }

  return (
    <div className="App">
      <button onClick={playX}>play</button>
      <button onClick={changeSquare}>square</button>
      <button onClick={changeSine}>sine</button>
      <button onClick={changeSawtooth}>sawtooth</button>
      <button onClick={changeTriangle}>triangle</button>
      <div id="test-area" onMouseMove={changeFreq}></div>
      <p>Mouse X is: {x}</p>
      <p>Mouse Y is: {y}</p>

    </div>
  )
}

export default App