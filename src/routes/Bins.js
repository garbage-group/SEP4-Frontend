

import BinMap from "../components/Bin/BinMap";
import BinSidebar from "../components/Bin/BinSidebar";

import "../styles/Bin_css/Bins.css";

export function Bins() {
 

    return (
        <div className="mainContainer">
            <BinSidebar />
            <BinMap />     
        </div>
    )
}


