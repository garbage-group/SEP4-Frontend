
import {useURLPosition} from "../../hooks/useURLPosition";

import "../../styles/Bin_css/BinForm.css";
import BackButton from "./BackButton";

function BinForm() {
 
    const [lat, lng] = useURLPosition();
    return (
        <form className="binForm">
            <div className="row1">

            <div className="binRow">
                <label htmlFor="capacity">Capacity</label>
                <input id="capacity" type="number"  placeholder="Bin capacity..." required/>
            </div>

                <div className="binRow">
                <label htmlFor="threshold">Fill Threshold</label>
                <input id="threshold" type="number" placeholder="Bin threshold..." required/>
            </div>
            </div>

            <div className="row2">

                <div className="binRow">
                <label htmlFor="latitude">Latitude</label>
                <input id="latitude" type="number" placeholder="Enter latitude..." required/>
            </div>

            <div className="binRow">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" type="number" placeholder="Enter longitude..." required/>
            </div>
            </div>


            <div className="binButtons">
                <BackButton>Add</BackButton>
                <BackButton>&larr; Back </BackButton>
            </div>
        </form>
    )
}

export default BinForm;
