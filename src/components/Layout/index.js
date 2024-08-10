import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../Logo';

import './index.css'
import MusicList from '../MusicList';
import MusicPlayer from '../MusicPlayer';
import { RotatingLines } from "react-loader-spinner";




const Layout = () => {

  const [songsData, setData] = useState([]);
  const [serachQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [backgroundColor, setBackground] = useState('#000000');

  

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://cms.samespace.com/items/songs");
        const data = response.data.data;

        const getSongDuration = (url) => {
          return new Promise((resolve, reject) => {
            const audio = new Audio(url);
            audio.onloadedmetadata = () => {
              resolve(audio.duration); 
            };
            audio.onerror = reject;
          });
        };

        const updatedData = await Promise.all(data.map(async (eachData) => {
          try {
            const duration = await getSongDuration(eachData.url);
            return {
              accent: eachData.accent,
              artist: eachData.artist,
              imgCover: `https://cms.samespace.com/assets/${eachData.cover}`,
              dateCreated: eachData.date_created,
              dataUpdated: eachData.date_updated,
              id: eachData.id,
              name: eachData.name,
              sort: eachData.sort,
              status: eachData.status,
              topTrack: eachData.top_track,
              songUrl: eachData.url,
              userCreated: eachData.user_created,
              userUpdated: eachData.user_updated,
              duration, 
            };
          } catch (error) {
            console.error(`Error fetching duration for song ${eachData.name}:`, error);
            return null;
          }
        }));

        setData(updatedData.filter(song => song !== null)); 

      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(serachQuery) ||
    song.artist.toLowerCase().includes(serachQuery)
  );

  const handleSongSelect = (index) => {
    const selectedSong = filteredSongs[index];
    setCurrentSongIndex(index);
    setBackground({
      color: selectedSong.accent,
    });

    
};

const handlePrevious = () => {
  setCurrentSongIndex((prevIndex) => {
    const newIndex = prevIndex === 0 ? filteredSongs.length - 1 : prevIndex - 1;
    setBackground({
      color: filteredSongs[newIndex].accent,
    });
    return newIndex;
  });
};
const handleNext = () => {
  setCurrentSongIndex((prevIndex) => {
    const newIndex = prevIndex === filteredSongs.length - 1 ? 0 : prevIndex + 1;
    setBackground({
      color: filteredSongs[newIndex].accent,
    });
    return newIndex;
  });
};




  return (
    <div className='container' style={{ backgroundColor: backgroundColor.color || '#000000'}}>
      <div className='logo-container'>
        <Logo />
      </div>
      <div className='playlist-container'>
        <div className='musiclist-header-container'>
          <h1 className='for-you-header'>For You</h1>
          <h1 className='top-tracks-header'>Top Tracks</h1>
        </div>
        <div className='input-container'> 
          <input 
          placeholder='Search Song, Artist' 
          className='search-input' 
          type='text'
          value={serachQuery}
          onChange={handleSearchChange}
          />
        </div>
        {isLoading ? (
          <div className='loader-container'>
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="40"
            visible={true}
          />
          </div>
        ) : (
          filteredSongs.map((eachSongDetails, index) => (
            <MusicList data={eachSongDetails} 
            key={eachSongDetails.id} 
            onSelect={() => handleSongSelect(index)}
            duration={eachSongDetails.duration}/>
          ))
        )}
      </div>
      <div className='player-container'>
        {currentSongIndex !== null ? (
            <MusicPlayer
                data={filteredSongs[currentSongIndex]}
                onPrevious={handlePrevious}
                onNext={handleNext}
                />
              ) : (
                <div className='no-song-selected'>
                  <p>Select a Song to Play</p>
                </div>
        )}
      </div>
    </div>
  )
}

export default Layout