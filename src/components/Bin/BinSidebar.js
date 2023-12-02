import BinNav from "./BinNav";

import "../../styles/Bin_css/BinSidebar.css"
import { Outlet } from "react-router";

function BinSidebar() {
    return (
        <div className="sidebar">

            <BinNav />


            <Outlet />

        </div>
    )
}

export default BinSidebar
