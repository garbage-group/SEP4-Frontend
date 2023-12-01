import { useContext, useEffect, useState, createContext } from "react";
import { useAuth } from "./LoginAuthContext";

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";
// const BASE_URL = "http://localhost:8080";

const BinContext = createContext();

function BinProvider({ children }) {
  const [bins, setBins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBin, setCurrentBin] = useState({});
  const { token, isAuthenticated } = useAuth();

  //get all bins
  useEffect(
    function () {
      async function fetchBins() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/bins/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setBins(data);
        } catch (e) {
          alert(e.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (isAuthenticated) fetchBins();
    },
    [token, isAuthenticated]
  );

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
      // console.log(data);
      setCurrentBin(data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  //create new bin
  async function createBin(newBin) {
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

  //update bin by id
  //update bin by id
  async function updateBin(id, updatedBin) {
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

      /* if (res.ok) {
        // If successful, update the currentBin value
        setCurrentBin(newUpdatedBin);
      } */
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
        updateBin,
        createBin,
        deleteBin,
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
