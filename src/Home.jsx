import { Link } from "react-router-dom"
import { useState, useRef } from "react"
import "./Home.css"


export function HomePage({ NavigationBar }) {
    const [words, setWords] = useState('Your music. Your moment.');
    const [count, setCount] = useState(0);
    const [updateWords, setUpdateWords] = useState("")


    const type = () => {
        if (count < words.length) {

            setUpdateWords(updateWords + words[count]);
            setCount(prev => prev + 1);
        }
    }

    setTimeout(() => {
        type();
    }, 150);

    console.log(words.length);

    return (
        <>

            <NavigationBar />

            <header className="header">
                <h1 className="logo">🎧 Vibe Stream</h1>
                <Link to="/library" >
                    <button className="header-btn">Open Library</button>
                </Link>
            </header>

            <section className="hero">
                <div className="hero-text">
                    <h2>{updateWords}</h2>

                    <p>
                        Stream, record, and experience music without distractions.
                        Built for focus, creativity, and pure listening.
                    </p>

                    <div className="hero-actions">
                        <Link to="/library" >
                            <button className="primary-btn">Go to Library</button>
                        </Link>
                        <Link to="/rec">
                            <button className="secondary-btn">Record a Sound</button>
                        </Link>

                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-circle"></div>
                    <span className="headphone-icon">🎧</span>
                </div>
            </section>

            <div className="dispalyGrid">
                <div className="box" ><h3>Creative 〽️ </h3><p>Record Ideas Instantly</p></div>

                <div className="box"><h3>Fast 🚀</h3><p>Optimized For Performance</p></div>

                <div className="box"><h3>Clean 🫧 </h3> <p>NO Distractions, evr</p> </div>

            </div>

            <section className="features">
                <div className="feature-card">
                    <h3>🎵 Clean Listening</h3>
                    <p>No clutter. Just music and control.</p>
                </div>

                <div className="feature-card">
                    <h3>🎙 Built-in Recording</h3>
                    <p>Capture sounds, ideas, or moments instantly.</p>
                </div>

                <div className="feature-card">
                    <h3>⚡ Smooth Performance</h3>
                    <p>Fast, lightweight, and distraction-free.</p>
                </div>
            </section>


            <section className="emotion">
                <h2>Music isn’t just sound.</h2>
                <p>It’s focus. It’s escape. It’s energy.</p>
            </section>

            <section className="cta">
                <h2>Ready to start listening differently?</h2>
                <Link to="/library">
                    <button className="primary-btn">Start Listenig</button>
                </Link>

                <span>No sign-up. No noise. Just music.</span>
            </section>

            <div className="footer">
                <p>&copy; 2026 VibeStream. All rights reserved &trade; CodewithCy</p>
            </div>

        </>
    )
}