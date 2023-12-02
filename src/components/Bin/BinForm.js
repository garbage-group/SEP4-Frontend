import { useState } from "react";
import { useURLPosition } from "../../hooks/useURLPosition";
import "../../styles/Bin_css/BinForm.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useBins } from "../../contexts/BinContext";

function BinForm() {
    // State hooks for form inputs and necessary values
    const [lat, lng] = useURLPosition();
    const [capacity, setCapacity] = useState("");
    const [threshold, setThreshold] = useState("");
    const [manualLat, setManualLat] = useState("");
    const [manualLng, setManualLng] = useState("");
    const { createBin } = useBins();
    const navigate = useNavigate();

    // Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creating a new bin object
        const newBin = {
            capacity,
            fillThreshold: threshold,
            latitude: lat || manualLat,
            longitude: lng || manualLng,
        };

        // Validating form data before submitting
        if (capacity && threshold && (lat || manualLat) && (lng || manualLng)) {
            await createBin(newBin);
            navigate("/bins/binList");
        } else {
            return (
                <p>Form submission failed. Please fill in all the required fields.</p>
            );
        }
    }


    return (
        <form className="binForm" onSubmit={handleSubmit}>
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
                        value={lat || manualLat}
                        onChange={(e) => setManualLat(e.target.value)}
                    />
                </div>

                <div className="binRow">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        id="longitude"
                        type="number"
                        placeholder="Enter longitude..."
                        required
                        value={lng || manualLng}
                        onChange={(e) => setManualLng(e.target.value)}
                    />
                </div>
            </div>

            {/* Form Submission Buttons */}
            <div className="binButtons">
                <button className={"btn"}>Add</button>
                <BackButton className={"btn"}>&larr; Back </BackButton>
            </div>
        </form>
    );
}



export default BinForm;
