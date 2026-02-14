import { useState } from "react";

import "./App.css"

export function LibraryPage({ setSearchSongs, searchSongs, searchedSongs, playSong, previous, next, NavigationBar, music, PlayNow, audioRef, set, displayIcon, justPlay, seek, currentTime, duration }) {





    return (
        <>
            <NavigationBar NavigationBar />

            <div className="library-and-palyNow-component">

                <PlayNow previous={previous} next={next} set={set} seek={seek} displayIcon={displayIcon} audioRef={audioRef} currentTime={currentTime} duration={duration} />

                <section className="library">
                    <h2 className="music-library">Music Library</h2>

                    <input
                        type="text"
                        className="search"
                        placeholder="Search music"
                        value={searchSongs}
                        onChange={(e) => {
                            setSearchSongs(e.target.value)
                        }}
                    />
                    <div className="song-list">
                        {!searchSongs ? (music.map((song) => {
                            return (
                                <div key={song.id}>
                                    <div className="song" >
                                        <img src={song.coverImage} />
                                        <div className="song-info">
                                            <h4>{song.tittle}</h4>
                                            <p>{song.artist}</p>
                                            <h5>Album: <span className="album">{song.album}</span></h5>
                                        </div>
                                        <span className="duration">{song.duration}</span>
                                        <button className="play-btn"

                                            onClick={() => {
                                                justPlay(song);
                                            }}
                                        >Play</button>
                                        {/* <button className="play-btn stop"
                                        onClick={() => {
                                            onStop(song);
                                        }}
                                    >Stop</button> */}
                                    </div>
                                </div>

                            )
                        })) : ""}



                        {searchSongs && (searchedSongs.map((song) => {
                            return (

                                <div key={song.id}>
                                    <div className="song" >
                                        <img src={song.coverImage} />
                                        <div className="song-info">
                                            <h4>{song.tittle}</h4>
                                            <p>{song.artist}</p>
                                            <h5>Album: <span className="album">{song.album}</span></h5>
                                        </div>
                                        <span className="duration">{song.duration}</span>
                                        <button className="play-btn"

                                            onClick={() => {
                                                justPlay(song);
                                            }}
                                        >Play</button>

                                    </div>
                                </div>

                            )
                        }))}
                    </div>

                </section>

            </div>

        </>
    )
}