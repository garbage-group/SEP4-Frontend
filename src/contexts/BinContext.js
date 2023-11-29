
import { useContext, useEffect, useState } from "react";
import { createContext } from "vm";

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

const BinContext =  createContext();

function BinProvider({children}){
    const [bins, setBins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentBin, setCurrentBin] = useState({});

    useEffect(function(){
        async function fetchBins(){
            try{
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/bins/all`);
                const data = await res.json();
                setBins(data);
            } catch (e) {
                alert(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBins();
    },[]);

    async function getBin(id) {
        if(Number(id) === currentBin.id) return;


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

    return (
        <BinContext.Provider
            value={{
                bins,
                isLoading,
                currentBin,
                getBin,
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

export {BinProvider, useBins};
