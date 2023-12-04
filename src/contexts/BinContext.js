import { useContext, useEffect, useState } from "react";
import { createContext } from "react";


const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";
// const BASE_URL = "http://localhost:8080";

const BinContext = createContext();

function BinProvider({ children }) {
  const [bins, setBins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBin, setCurrentBin] = useState({});
  const [currentBinHumidity, setCurrentBinHumidity] = useState(null);
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));
  const fetchInterval = 3600000; // 1 hour in milliseconds

  useEffect(function () {
    let intervalId;
    async function fetchBins() {
      if(!isAuthenticated || !token){
        return;
      }
      try {

        
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/bins/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await res.json();
        setBins(data);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    if(isAuthenticated){

      fetchBins();
      intervalId = setInterval(fetchBins, fetchInterval);
    }

    return() => {
      if(intervalId){
        clearInterval(intervalId);
      }
    }
  }, [isAuthenticated, token]);

  

  //get bin by id
  async function getBin(id) {
    if (Number(id) === currentBin.id) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/bins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setCurrentBin(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  //create new bin
  async function createBin(newBin) {
    if (!isAuthenticated || !token) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/bins`, {
        method: "POST",
        body: JSON.stringify(newBin),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  //delete bin by id
  async function deleteBin(id) {
    if (!isAuthenticated || !token) {
      return;
    }
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/bins/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBins((bins) => bins.filter((bin) => bin.id !== id));
    } catch {
      alert("There was an error deleting data");
    } finally {
      setIsLoading(false);
    }
  }

  async function getBinHumidity(binId) {
    if (!isAuthenticated || !token) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/bins/${binId}/humidity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  //update bin by id
  //update bin by id
  async function updateBin(id, updatedBin) {
    if (!isAuthenticated || !token) {
      return;
    }
    try {
      const newUpdatedBin = {
        id: updatedBin.id,
        fillthreshold: updatedBin.newFIllThreshold,
        latitude: updatedBin.newLatitude,
        longitude: updatedBin.newLongitude,
      };

      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/bins/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newUpdatedBin),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Request Payload:", JSON.stringify(newUpdatedBin));

      if (res.ok) {
        // If successful, update the currentBin value
        setCurrentBin(newUpdatedBin);
      }
    } catch (error) {
      alert(error);
      console.error("Error updating bin:", error.message);
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
        updateBin
      }}
    >
      {children}
    </BinContext.Provider>
  );
}

//Create custom hook to consume BinContext
function useBins() {
  const context = useContext(BinContext);
  if (context === undefined) {
    throw new Error("Bin context was used outside the BinProvider ");
  }
  return context;
}

export { BinProvider, useBins };
