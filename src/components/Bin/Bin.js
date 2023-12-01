import { useEffect } from "react";
import { useBins } from "../../contexts/BinContext";
import { useParams } from "react-router";
import { Spinner } from "../Spinner";
import BackButton from "./BackButton";
import "../../styles/Bin_css/Bin.css";
import { Button } from "@mui/material";



const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function Bin() {
    const { id } = useParams();

    const { getBin, currentBin, isLoading } = useBins();

    useEffect(() => {
        const fetchData = async () => {
            await getBin(id);
        };

        fetchData();
    },
        [id, getBin]
    );

    //extracting data from bin object;
    const { deviceId, capacity, emptiedLast, fillThreshold, latitude, longitude, fillLevels, humidity } = currentBin;


    if (isLoading) {
        return <Spinner />;
    }


    //handle edit 
    const handleEdit = (e) =>{
        e.preventDefault();

        //rest of the code here
    }

    //handle save
    const handleSave = (e) => {
        e.preventDefault();

        //rest of the code here
    }

    return (

        <div className="bin">

            <div className="row">
                <h6>Bin</h6>
                <input className="binInput" type="number" disabled value={id}/>
            </div>

            <div className="row">
                <h6>Capacity</h6>
              
                <input className="binInput" value={ capacity } disabled/>
            </div>

            <div className="row">
                <h6>Device Id</h6>
                <input className="binInput" value={deviceId} disabled/>
            </div>

            <div className="row">
                <h6>Fill Threshold</h6>
                <input className="binInput" value={`${fillThreshold}%`} disabled /> 
            </div>

            <div className="row">
                <h6>Position</h6>
                <label htmlFor="lat">Latitude</label>
                <input id="lat" className="binInput" type="number" value={latitude} disabled />
                <label htmlFor="lng">Longitude</label>
                <input id="lng" className="binInput" type="number" value={longitude} disabled />
            </div>

            <div className="row">
                <h6>Last emptied on</h6>
                <input className="binInput" value={formatDate(emptiedLast || null)} disabled/>
            </div>

            <div className="row">
                <h6>Fill Level</h6>
               
                {fillLevels && fillLevels.length > 0 && (
                    <>
                        <input className="binInput" value={`${fillLevels[fillLevels.length - 1].value } %`} disabled/>
                        
                        <input className="binInput" value={`${formatDate(fillLevels[fillLevels.length - 1].dateTime || null)}`} disabled/>
                    </>
                )}
            </div>

            <div className="row">
                <h6>Humidity</h6>
                {humidity && humidity.length > 0 && (
                    <>
                        <input className="binInput" value={`${humidity[humidity.length - 1].value}%}`} disabled/>
                        <input className="binInput" value={`${formatDate(humidity[humidity.length - 1].dateTime || null) }`} disabled/>                   
                    </>
                )}
            </div>

            <div>
                <BackButton className={"btn"}>&larr; Back </BackButton>
                <Button onClick={handleEdit} >Edit</Button>
                <Button onClick={handleSave} disabled>Save</Button>
            </div>
        </div>

    )
}

export default Bin;
