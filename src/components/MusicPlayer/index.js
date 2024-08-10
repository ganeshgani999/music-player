import React, { useRef, useEffect, useState } from 'react';
import './index.css'

const MusicPlayer = ({ data, onPrevious, onNext }) => {

    const {artist, name, songUrl, imgCover} = data
    console.log("data741", data);
    

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
      if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
      }
  }, [data]);

  const handlePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
};

const handlePrevious = () => {
  if (onPrevious) {
      onPrevious();
  }
};

const handleNext = () => {
  if (onNext) {
      onNext();
  }
};



     

  return (
    <div className='music-container'>
        <div>
          <h1 className='music-header'>{artist}</h1>
          <p className='music-name'>{name}</p>

          <audio ref={audioRef} src={songUrl}>
          </audio>
          <div>
            <img src={imgCover} className='music-img' alt='music-img'/>
          </div>
          <div className='controls'>
              <button className='button'>
              <img src='assets/menu.png' className='prev-nxt-img' alt='menu-img'/>
              </button>
              <button onClick={handlePrevious} className='button'>
                <img src='assets/Prev.png' className='prev-nxt-img' alt='prev-img'/>
              </button>
              <button onClick={handlePlayPause} className='button'>
                  {isPlaying ? <img src='assets/playpause.png' alt='pasue' className='play-pause-img'/> : <img src='assets/play.png' className='play-pause-img' alt='play'/>}
              </button>
              <button onClick={handleNext} className='button'>
              <img src='assets/nxt.png' className='prev-nxt-img' alt='next'/>
              </button>
              <button className='button'>
                <img src='assets/sound.png' className='sound' alt='sound-img'/>
              </button>
          </div>
        </div>
    </div>
  )
}

export default MusicPlayer