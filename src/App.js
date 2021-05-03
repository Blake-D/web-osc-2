import './App.css'

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

  return (
    <div className="App">
      <button onClick={playX}>play</button>
    </div>
  )
}

export default App