import { useEffect } from "react";
import { useBins } from "../../contexts/BinContext";
import { useParams } from "react-router";
import { Spinner } from "../Spinner";
import BackButton from "./BackButton";
import "../../styles/Bin_css/Bin.css";



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

    return (



        <div className="bin">

            <div className="row">
                <h6>Bin</h6>
                {/* <input type="text" disabled value={id}/> */}
                <h3>
                    {id}
                </h3>
            </div>

            <div className="row">
                <h6>Capacity</h6>
                <p>{capacity}</p>
            </div>

            <div className="row">
                <h6>Device Id</h6>
                <p>{deviceId}</p>
            </div>

            <div className="row">
                <h6>Fill Threshold</h6>
                <p>{fillThreshold}</p>
            </div>

            <div className="row">
                <h6>Position</h6>
                <p>Latitude {latitude}</p>
                <p>Longitude {longitude}</p>
            </div>

            <div className="row">
                <h6>Last emptied on</h6>
                <p>{formatDate(emptiedLast || null)}</p>
            </div>

            <div className="row">
                <h6>Fill Level</h6>
                {fillLevels && fillLevels.length > 0 && (
                    <>
                        <p>{fillLevels[fillLevels.length - 1].value}</p>
                        <p>{formatDate(fillLevels[fillLevels.length - 1].dateTime || null)}</p>
                    </>
                )}
            </div>

            <div className="row">
                <h6>Humidity</h6>
                {humidity && humidity.length > 0 && (
                    <>
                        <p>{humidity[humidity.length - 1].value}</p>
                        <p>{formatDate(humidity[humidity.length - 1].dateTime || null)}</p>
                    </>
                )}
            </div>

            <div>
                <BackButton />
            </div>
        </div>

    )
}

export default Bin;
