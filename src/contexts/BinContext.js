
import { useContext, useEffect, useState } from "react";
// import { createContext } from "vm";
import { createContext } from "react";
import { useAuth } from "./LoginAuthContext";

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

const BinContext = createContext();

function BinProvider({ children }) {
    const [bins, setBins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentBin, setCurrentBin] = useState({});
    const [currentBinHumidity, setCurrentBinHumidity] = useState(null);
    const { token, isAuthenticated } = useAuth();
    const fetchInterval = 3600000; // 1 hour in milliseconds

    useEffect(() => {
        let intervalId;

        async function fetchBins() {
            if (!isAuthenticated || !token) {
                return; // Do not fetch if not authenticated or if token is unavailable
            }

            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/bins/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setBins(data);
            } catch (error) {
                console.error("Error fetching bins:", error);
                alert("Failed to fetch bins: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchBins(); // Fetch immediately if authenticated
            intervalId = setInterval(fetchBins, fetchInterval); // Set up polling
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Clear the interval on cleanup
            }
        };
    }, [token, isAuthenticated]);


    async function getBin(id) {
        if (Number(id) === currentBin.id) return;


        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/bins/${id}`);
            const data = await res.json();
            setCurrentBin(data);
        } catch {
            alert("There was an error loading data");
        } finally {
            setIsLoading(false);
        }
    }



    async function createBin(newBin) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/bins`, {
                method: "POST",
                body: JSON.stringify(newBin),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setBins((bins) => [...bins, data]);
        } catch {
            alert("There was an error creating bin");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteBin(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/bins/delete/${id}`, {
                method: "DELETE",
            });

            setBins((bins) => bins.filter((bin) => bin.id !== id));
        } catch {
            alert("There was an error deleting data");
        } finally {
            setIsLoading(false);
        }
    }

    async function getBinHumidity(binId) {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/bins/${binId}/humidity`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            const humidityData = await response.json();
            setCurrentBinHumidity(humidityData);
        } catch (error) {
            console.error("Error fetching humidity data:", error);
            alert("There was an error loading the humidity data: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <BinContext.Provider
            value={{
                bins,
                isLoading,
                currentBin,
                getBin,
                currentBinHumidity,
                getBinHumidity,
                createBin,
                deleteBin,
            }}
        >
            {children}
        </BinContext.Provider>
    );
}

//Create custom hook to consume CitiesContext
function useBins() {
    const context = useContext(BinContext);
    if (context === undefined) {
        throw new Error("Cities context was used outside the CityProvider ");
    }
    return context;
}

export { BinProvider, useBins };
