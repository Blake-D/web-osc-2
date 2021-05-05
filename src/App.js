import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  var playX,
      playY,
      oscillatorX,
      oscillatorY

  let oscX = { // primary oscillator for all possible combos, frequency is tied to X-axis
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

  window.onload = function () {
    playX = function () {
      if(oscX.playing) { // stops the primary osc if it's already playing
        oscillatorX.stop()
        oscX.playing = false
      } else { //otherwise generates and starts it
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

    // determines the state of the mouse (down or up). the mousemove event listener below can only call the changeFreq functions if mouseState is true
    // let mouseState = false
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
      oscY.frequency = y
    }

    // grabs the mouse's x and y coordinates and uses them to inform the changeFreq functions
    document.getElementById("test-area").addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY
      changeFreq()
      playX()
      playX()
      playY()
      playY()
    })

    // document.getElementById("test-area").addEventListener('mousemove', () => { // calls the changeFreq functions if mouse is down
    //   if (mouseState = true) {
    //     // changeFreqX()
    //     playX()
    //     playX()
    //   }
    // })
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

  return (
    <div className="App">
      <div id="control-panel">
        <button id="sine-button" onClick={changeSine}>sine</button>
        <button id="triangle-button" onClick={changeTriangle}>triangle</button>
        <button id="square-button" onClick={changeSquare}>square</button>
        <button id="sawtooth-button" onClick={changeSawtooth}>sawtooth</button>
      </div>
      <div id="test-area"></div>
    </div>
  )
}

export default App