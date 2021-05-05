import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  var playX,
      oscillatorX

  let oscX = { // primary oscillator for all possible combos, frequency is tied to X-axis
    type: "sine",
    frequency: 20,
    playing: false
  }

  // var oscY = { // Y-axis osc if 2D is selected
  //     type: "sine",
  //     frequency: 20,
  //     playing: false
  // }

  // var oscX2 = { // harmonizing osc in 1D, linked to X-axis
  //     type: "sine",
  //     frequency: 20,
  //     playing: false
  // }

  var audioContext = new AudioContext()

  window.onload = function () {
    playX = function () {
      if (oscX.playing) { // stops the primary osc if it's already playing
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

    // determines the state of the mouse (down or up). the mousemove event listener below can only call the changeFreq functions if mouseState is true
    // let mouseState = false
    let x = null
    let y = null

    document.getElementById("test-area").addEventListener('mousedown', () => {
      playX()
    })

    document.getElementById("test-area").addEventListener('mouseup', () => {
      playX()
    })

    function changeFreqX() {
      oscX.frequency = x // changes the primary osc frequency
    }

    // grabs the mouse's x and y coordinates and uses them to inform the changeFreq functions
    document.getElementById("test-area").addEventListener('mousemove', (e) => {
      x = e.clientX
      y = e.clientY
      changeFreqX()
      playX()
      playX()
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