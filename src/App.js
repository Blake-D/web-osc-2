import './App.css'
import React from 'react'

function App() {

  var playX,
      playY,
      oscillatorX,
      oscillatorY

  let oscX = {
    type: "sine",
    frequency: 20,
    playing: false
  }

  let oscY = {
    type: oscX.type,
    frequency: 20,
    playing: false
  }

  var audioContext = new AudioContext()

  let poly = false

  window.onload = function () {
    playX = function () {
      if(oscX.playing) { 
        oscillatorX.stop()
        oscX.playing = false
      } else {
        oscillatorX = audioContext.createOscillator()
        oscillatorX.type = oscX.type
        oscillatorX.frequency.setValueAtTime(oscX.frequency, audioContext.currentTime)
        oscillatorX.connect(audioContext.destination)
        oscillatorX.start()
        oscX.playing = true
      }
    }

    playY = function () {
      if(oscY.playing) {
        oscillatorY.stop()
        oscY.playing = false
      } else {
        oscillatorY = audioContext.createOscillator()
        oscillatorY.type = oscX.type
        oscillatorY.frequency.setValueAtTime(oscY.frequency, audioContext.currentTime)
        oscillatorY.connect(audioContext.destination)
        oscillatorY.start()
        oscY.playing = true
      }
    }

    let x = null
    let y = null

    function changeFreq() {
      oscX.frequency = x
      if(poly === true){
        oscY.frequency = y
      } else{
        oscY.frequency = oscX.frequency * 1.01
      }
    }

    document.getElementById("grid").addEventListener('mousedown', () => {
      playX()
      playY()
    })

    document.getElementById("grid").addEventListener('mouseup', () => {
      playX()
      playY()
    })

    document.getElementById("grid").addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY
      changeFreq()
      playX()
      playX()
      playY()
      playY()
    })
  }

  function changePoly(){
    if(poly === false){
      poly = true
      document.getElementById('combo-setting').innerText = "POLY"
    } else{
      poly = false
      document.getElementById('combo-setting').innerText = "MONO"
    }
  }

  function changeSine(){
    oscX.type = "sine"
  }

  function changeTriangle(){
    oscX.type = "triangle"
  }

  function changeSquare(){
    oscX.type = "square"
  }

  function changeSawtooth(){
    oscX.type = "sawtooth"
  }

  function printWaveType(){
    document.getElementById('wave-type').innerText = oscX.type.toUpperCase()
  }

  return (
    <div className="App">
      <div id="button-panel">
        <button id="oneDee-button" onClick={changePoly}>mono/poly</button><br></br>
        <button id="sine-button" onClick={function(e){changeSine(); printWaveType()}}>sine</button>
        <button id="triangle-button" onClick={function(e){changeTriangle(); printWaveType()}}>triangle</button>
        <button id="square-button" onClick={function(e){changeSquare(); printWaveType()}}>square</button>
        <button id="sawtooth-button" onClick={function(e){changeSawtooth(); printWaveType()}}>sawtooth</button>
      </div>
      <div id="settings-display">
        <div id="type-display">
          <p className="left">wave type: </p>
          <p id="wave-type">SINE</p>
        </div>
        <div id="poly-display">
          <p className="left">setting: </p>
          <p id="combo-setting">MONO</p>
        </div>
      </div>
      <div id="grid"></div>
    </div>
  )
}

export default App