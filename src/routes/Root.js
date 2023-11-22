import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"

function Root() {
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="body-container">
                <Sidebar />
                <div className="outlet">
                    <Outlet />
                </div>
            </div>
        </>
      
    )
}

export default Root;
