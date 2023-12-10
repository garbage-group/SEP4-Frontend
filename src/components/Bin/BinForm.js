import { useEffect, useState } from "react";
import { useURLPosition } from "../../hooks/useURLPosition";
import "../../styles/Bin_css/BinForm.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useBins } from "../../contexts/BinContext";

function BinForm() {
    // State hooks for form inputs and necessary values

    const [mapLat, mapLng] = useURLPosition();
    const [capacity, setCapacity] = useState("");
    const [threshold, setThreshold] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const { createBin } = useBins();
    const navigate = useNavigate();


    useEffect(function () {
        if (mapLat && mapLng) {
            setLat(mapLat);
            setLng(mapLng);
        }
    }, [mapLat, mapLng]);


    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creating a new bin object
        const newBin = {
            capacity,
            fillThreshold: threshold,
            latitude: lat,
            longitude: lng
        };

        // Validating form data before submitting
        if (capacity && threshold && (lat && lng)) {
            await createBin(newBin);
            navigate("/bins/binList");
        } else {
            return (
                <p>Form submission failed. Please fill in all the required fields.</p>
            );
        }
    }


    return (
        <form className="binForm" onSubmit={(e) => handleSubmit(e)}>
            {/* Form Section: Capacity and Fill Threshold */}
            <div className="row1">
                <div className="binRow">
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        min={0}
                        placeholder="Bin capacity..."
                        required
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                </div>

                <div className="binRow">
                    <label htmlFor="threshold">Fill Threshold</label>
                    <input
                        id="threshold"
                        type="number"
                        max={100}
                        min={0}
                        placeholder="Bin threshold..."
                        required
                        value={threshold}
                        onChange={(e) => setThreshold(e.target.value)}
                        className="binForm_input"
                    />
                </div>
            </div>

            {/* Form Section: Latitude and Longitude */}
            <div className="row2">
                <div className="binRow">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        id="latitude"
                        type="number"
                        placeholder="Enter latitude..."
                        required
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>

                <div className="binRow">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        id="longitude"
                        type="number"
                        placeholder="Enter longitude..."
                        required
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </div>
            </div>

            {/* Form Submission Buttons */}
            <div className="binButtons">
                <div className="addCancel">
                    <button className={"btn"}>Add</button>
                    <button className={"btn"}>Cancel</button>
                </div>
                <BackButton className={"btn"}>&larr; Back </BackButton>
            </div>


        </form>
    );
}

export default BinForm;
