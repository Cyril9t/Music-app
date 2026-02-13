import { useRef, useState, useEffect } from "react";

import "./Recode.css"

export function RecordWithMic({ NavigationBar }) {
    const [recording, setRecording] = useState(false)
    const [audioLink, setAudioLink] = useState(null)
    const mediaRecodRef = useRef(null);
    const chunksRef = useRef([]);
    const [seconds, setSeconds] = useState(0)
    const [hours, setHours] = useState(0)


    const startRecorde = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const createRecording = new MediaRecorder(stream);
        mediaRecodRef.current = createRecording;
        chunksRef.current = [];

        createRecording.ondataavailable = (e) => {
            chunksRef.current.push(e.data);
        }

        createRecording.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
            const url = URL.createObjectURL(blob);
            setAudioLink(url);
        };

        createRecording.start();
        setRecording(true);

    }



    const stopRecording = () => {
        if (mediaRecodRef.current) {
            mediaRecodRef.current.stop();
            setRecording(false);
        }
    };

    const [inter, setInter] = useState(null)

    const timer = () => {

        setInter(prev => (setInterval(() => {
            setSeconds(prev => {
                if (prev === 60) {
                    setHours(hrs => hrs + 1);
                    return 0
                }
                return prev + 1;
            });
        }, 1000)));

    }

    const handleClicks = () => {
        recording ? stopRecording() : startRecorde();
        recording ? `${setInter(clearInterval(inter))} ${setSeconds(0)} ${setHours(0)}` : timer();
    }

    return (
        <>
            <NavigationBar />

            <h1 className="recodeLbel">Recoder</h1>
            <div className="recorder">
                <div className="recodSets">

                    <div className={`wave ${recording ? "active" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>
                        <span className="change"></span>

                    </div>

                    <button className={`mic-btn ${recording ? "Recoding" : ""}`}
                        onClick={() => {
                            handleClicks();
                        }}

                    >
                        {recording ? <img src="/mic-off.svg" /> : <img src="/UsedMic.svg" />}

                    </button>
                    <p className="statusWhileRecord">
                        <span>{recording ? `mins ${hours} : ${seconds} secs` : ""}</span><br />
                        {recording ? "Recording....." : "Tap to Record"}
                    </p>

                    {audioLink && (
                        <div className="auioOvaly">

                            <div className="audioMudal">
                                <div className="exit-btn">
                                    <button className="exit-icon" onClick={() => {
                                        setAudioLink(null)
                                    }}>
                                        &times;
                                    </button>
                                </div>


                                <div className="playRecords">
                                    <h3>Download And listen to Your Recorde</h3>
                                    <audio controls src={audioLink} className="auio"></audio>
                                    {/* <a href={audioLink}
                                        download="JustRecoded.mp3">
                                        Download

                                    </a> */}
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}