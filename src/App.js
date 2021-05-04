import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  // function useMouse(){
  //   const [mousePosition, setMousePosition] = useState({
  //     x: null,
  //     y: null
  //   })
  
  //   useEffect(() => {
  //     function handle(e){
  //       setMousePosition({
  //         x: e.pageX,
  //         y: e.pageY
  //       })
  //     }
  //     document.addEventListener("mousemove", handle)
  //     return () => document.removeEventListener("mousemove", handle)
  //   })
  //   return mousePosition
  // }

  // const {x, y} = useMouse()

  var oscillatorX

  // const [oscX, setOscX] = useState({
  //   type: "sine",
  //   frequency: 200,
  //   playing: false
  // })

  let oscX = {
    type: "sine",
    frequency: 200,
    playing: false
  }


  function stopX(){
    oscillatorX.stop()
  }

  const audioContext = new AudioContext()

  function playX(){
    if(oscX.playing === false){
      oscX.playing = true
      oscillatorX = audioContext.createOscillator()
      oscillatorX.type = oscX.type
      oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
      oscillatorX.connect(audioContext.destination)
      oscillatorX.start()
    } else if(oscX.playing === true){
      oscX.playing = false
      stopX()
    }
  }


  return (
    <div className="App">
      <div id="test-area" onClick={playX}></div>
      {/* <button onClick={up100}>click me</button> */}
      {/* <p>Mouse X is: {x}</p>
      <p>Mouse Y is: {y}</p> */}
    </div>
  )
}

export default App