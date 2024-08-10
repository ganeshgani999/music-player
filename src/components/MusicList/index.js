import React from "react";

import './index.css'

const MusicList = ({ data, onSelect}) => {

    if (!data) {
        return null;
    }

    const {artist, name, imgCover, duration} = data

    const formatDuration = (seconds) => {
        if (isNaN(seconds) || seconds === Infinity) return '0:00';
      
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
      
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      };
    
    return (
        <div className="song-container" onClick={onSelect}>
            <div className="img-artist-container">
                <img src={imgCover} className="song-profile" alt="profille-img"/>
                <div className="artist-container">
                    <p className="song-name">{name}</p>
                    <p className="song-artist">{artist}</p>
                </div>
            </div>
            <p>{formatDuration(duration)}</p>
        </div>
    )
}
export default MusicList