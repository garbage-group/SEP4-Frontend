import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./LoginAuthContext";
const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const { isAuthenticated, token } = useAuth();
    const fetchInterval = 60000; // 1 minute in milliseconds
    const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

    useEffect(() => {
        let intervalId;

        async function fetchNotifications() {
            if (!isAuthenticated || !token) {
                return; // Do not fetch if not authenticated or if the token is unavailable
            }
            try {
                const response = await fetch(`${BASE_URL}/bins/notification`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }

        if (isAuthenticated) {
            fetchNotifications(); // Fetch immediately if authenticated
            intervalId = setInterval(fetchNotifications, fetchInterval); // Set up polling
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Clear the interval on cleanup
            }
        };
    }, [token, isAuthenticated]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
}

export { NotificationProvider, useNotifications };
