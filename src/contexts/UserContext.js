import React, { createContext, useContext, useState } from "react";

export const UserManagementContext = createContext();

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

export function UserManagementProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");

    const addUser = async (userData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to be handled in the component
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserManagementContext.Provider value={{ isLoading, addUser }}>
            {children}
        </UserManagementContext.Provider>
    );
}

export function useUserManagement() {
    const context = useContext(UserManagementContext);
    if (!context) {
        throw new Error("useUserManagement must be used within a UserManagementProvider");
    }
    return context;
}