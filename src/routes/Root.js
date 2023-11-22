import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { Login } from "./Login";




export function Root() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // When the component mounts, check if user is already logged in from localStorage
    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        if (storedIsLoggedIn === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            {isLoggedIn ?
                (<>
                    <div>
                        <Navbar setIsLoggedIn={setIsLoggedIn}/>
                    </div>

                    <div className="body-container">
                        <Sidebar />
                        <div className="outlet">
                            <Outlet />
                        </div>
                    </div>
                </>) 
            : <Login setIsLoggedIn={setIsLoggedIn}/>}
        </>

    )
}


