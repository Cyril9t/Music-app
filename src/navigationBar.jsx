import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export function NavigationBar() {

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);




    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString("en-US", options);



    return (
        <>

            <header className="navbar">
                <div className="nav-left">

                    <Link to="/">
                        <span className="nav-link home">Home</span>
                    </Link>

                    <Link to="/library">
                        <span className="nav-link active">Library</span>
                    </Link>

                    <Link to="/rec">
                        <span className="nav-link">Record</span>
                    </Link>

                </div>

                <div className="nav-right">
                    <span className={isOnline ? "status" : "off"}>{isOnline ? "You are online 🌐" : "You are offline ❌"}</span>
                    <span className="date">{formattedDate}</span>
                    <img className="avatar" src="/background.jpg" alt="avatar" />
                </div>
            </header>

        </>
    )
}