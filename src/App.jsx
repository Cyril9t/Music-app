import { Routes, Route } from "react-router-dom"
import { LibraryPage } from "./Library.jsx"
import { HomePage } from "./Home"
import { CurrentlyPlaying } from "./PlayingNow"
import { RecordWithMic } from "./Recoder"
import { NavigationBar } from "./navigationBar"
import allSongs from "./songs"
import { useState, useRef } from "react"

function App() {
  const [music] = useState(allSongs);
  const [songPlayingNow, setSongPlayingNow] = useState(null);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState();
  const [currentMusic, setCurrentMusic] = useState(0);
  const [searchSongs, setSearchSongs] = useState('');

  const justPlay = (song) => {
    setSongPlayingNow(song);
    audioRef.current.src = song.audioPlay;
    audioRef.current.load();
    audioRef.current.play();
  }

  const playSong = (index) => {
    const sonPlay = music[index]
    audioRef.current.src = sonPlay.audioPlay;
    audioRef.current.load();
    audioRef.current.play();
    setCurrentMusic(index);
    setSongPlayingNow(sonPlay)
  }


  const next = () => {
    const nextIndex = (currentMusic + 1) % music.length;
    playSong(nextIndex);
  }
  const previous = () => {
    const nextIndex = (currentMusic - 1 + music.length) % music.length;
    playSong(nextIndex);
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  }

  const handleLoadedMetedata = () => {

    setDuration(audioRef.current.duration);
  }

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time)
  };

  const searchedSongs = music.filter((songS) =>
    songS.tittle.toLowerCase().includes(searchSongs.toLowerCase()) ||

    songS.artist.toLowerCase().includes(searchSongs.toLowerCase())
  );




  return (

    <>

      <audio ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetedata}
      />

      <Routes>
        <Route path="/" element={<HomePage NavigationBar={NavigationBar} />} />
        <Route path="/library" element={<LibraryPage setSearchSongs={setSearchSongs} searchSongs={searchSongs} searchedSongs={searchedSongs} playSong={playSong} previous={previous} next={next} NavigationBar={NavigationBar} audioRef={audioRef} justPlay={justPlay} music={music} set={songPlayingNow} PlayNow={CurrentlyPlaying} currentTime={currentTime} duration={duration} seek={seek} />} />
        <Route path="/rec" element={<RecordWithMic NavigationBar={NavigationBar} />} />
      </Routes>
    </>



  )
}

export default App
