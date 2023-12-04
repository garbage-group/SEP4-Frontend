import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from "../contexts/LoginAuthContext";

const HumidityDataContext = createContext();

export const HumidityDataProvider = ({ children }) => {
    const { token } = useAuth();

    const fetchHumidity = async ({ queryKey }) => {
        const [_, binId] = queryKey;
        const response = await fetch(
            `https://garbage-backend-service-kq2hras2oq-ey.a.run.app/bins/${binId}/humidity`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return response.json();
    };

    const { data, error, isLoading } = useQuery(['humidity', binId], fetchHumidity, {
        enabled: false // Query will not automatically run
    });

    return (
        <HumidityDataContext.Provider value={{ data, error, isLoading }}>
            {children}
        </HumidityDataContext.Provider>
    );
};