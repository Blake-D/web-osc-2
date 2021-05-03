import './App.css'
// import React, { useState } from 'react'

function App() {

  var oscillatorX

  let oscX = {
    type: "sine",
    frequency: 200,
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

  return (
    <div className="App">
      <button onClick={playX}>play</button>
      <button onClick={changeSquare}>square</button>
      <button onClick={changeSine}>sine</button>
      <button onClick={changeSawtooth}>sawtooth</button>
      <button onClick={changeTriangle}>triangle</button>
    </div>
  )
}

export default App