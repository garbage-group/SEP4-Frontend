import { Outlet } from "react-router-dom"
import { useState } from "react"

import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { Login } from "./Login";



export function Root() {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    return (
        <>
            {isLoggedin ?
                (<>
                    <div>
                        <Navbar />
                    </div>

                    <div className="body-container">
                        <Sidebar />
                        <div className="outlet">
                            <Outlet />
                        </div>
                    </div>
                </>) : <Login setIsLoggedIn={setIsLoggedIn} />}
        </>

    )
}


