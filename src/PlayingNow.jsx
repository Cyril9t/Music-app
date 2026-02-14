import { useState } from "react";
export function CurrentlyPlaying({ previous, next, audioRef, set, currentTime, duration, seek, }) {
    const [playing, setPlaying] = useState(false);
    const [displayIcon, setDisplayIcon] = useState('⏸')

    const playNpause = (set) => {
        if (!playing) {
            setDisplayIcon("▶")
            audioRef.current.src = set.audioPlay;
            audioRef.current.pause();
        } else {
            setDisplayIcon("⏸")
            audioRef.current.src = set.audioPlay;
            audioRef.current.play();
        }
        setPlaying(!playing)
    }

    if (!set) {
        return (
            <div className="now-playing">
                <h2 className="PlayingNowText">No Song Playing Now</h2>
                <div className="player">
                    <img className="cover" src="/background.jpg" alt="cover" />
                    <div className="player-info">
                        <h3>
                            song Tittle
                        </h3>
                        <p>Song Artist</p>

                        <div className="progress">
                            <span>0:00</span>
                            <input type="range"
                            />
                            <span>0:00</span>
                        </div>
                        <div className="controls">
                            <button>⏮</button>
                            <button className="play"
                            >▶</button>
                            <button>⏭</button>
                            <button>🔊</button>
                        </div>
                    </div>

                    {/* <button className="download-btn">⬇ Download</button> */}
                </div>

            </div>
        );
    }


    return (
        <>
            <section className="now-playing">
                <h2 className="PlayingNowText">Now Playing</h2>
                <div className="player">
                    <img className="cover" src={set.coverImage} alt="cover" />
                    <div className="player-info">
                        <h3>
                            {set.tittle}
                        </h3>
                        <p>{set.artist}</p>

                        <div className="progress">
                            <span>{formatTime(currentTime)}</span>
                            <input type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                onChange={(e) => seek(Number(e.target.value))}
                            />
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div className="controls">
                            <button
                                onClick={previous}
                            >⏮</button>
                            <button className="play"
                                onClick={() => {
                                    playNpause(set);
                                }}
                            >{displayIcon}</button>
                            <button onClick={next}

                            >⏭</button>
                            <button>🔊</button>
                            {set && (
                                <a className="downlaod"
                                    href={set.audioPlay}
                                    download={set.tittle + ".mp3"}>Download</a>

                            )}
                        </div>

                    </div>

                    {/* <button className="download-btn">⬇ Download</button> */}
                </div>

            </section>


        </>
    )
}

function formatTime(time) {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}