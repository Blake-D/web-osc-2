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

    document.getElementById("test-area").addEventListener('mousedown', () => {
      playX()
      playY()
    })

    document.getElementById("test-area").addEventListener('mouseup', () => {
      playX()
      playY()
    })

    function changeFreq() {
      oscX.frequency = x
      if(poly === true){
        oscY.frequency = y
      } else{
        oscY.frequency = oscX.frequency * 1.01
      }
    }

    document.getElementById("test-area").addEventListener('mousemove', (e) => {
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
      document.getElementById('combo-setting').innerText = "setting: poly"
    } else{
      poly = false
      document.getElementById('combo-setting').innerText = "setting: mono"
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
    document.getElementById('wave-type').innerText = "wave type: " + oscX.type
  }

  return (
    <div className="App">
      <div id="control-panel">
        <button id="sine-button" onClick={function(e){changeSine(); printWaveType()}}>sine</button>
        <button id="triangle-button" onClick={function(e){changeTriangle(); printWaveType()}}>triangle</button>
        <button id="square-button" onClick={function(e){changeSquare(); printWaveType()}}>square</button>
        <button id="sawtooth-button" onClick={function(e){changeSawtooth(); printWaveType()}}>sawtooth</button>
        <button id="oneDee-button" onClick={changePoly}>mono/poly</button>
        <div id="wave-type">wave type: sine</div>
        <div id="combo-setting">setting: mono</div>
      </div>
      <div id="test-area"></div>
    </div>
  )
}

export default App