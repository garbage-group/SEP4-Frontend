import { useSearchParams } from "react-router-dom";
import "../../styles/Bin_css/BinMap.css";

function BinMap() {

    const [param, setParam] = useSearchParams();

    //get lat and lng params from the url
    const lat = param.get("lat");
    const lng = param.get("lng");
    return (
        <div className="mapContainer">
            Map
        </div>
    )
}

export default BinMap
