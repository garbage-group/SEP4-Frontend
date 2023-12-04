import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./LoginAuthContext";
import moment from "moment"; // Import moment.js for date manipulation

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const { isAuthenticated, token } = useAuth();
    const fetchInterval = 60000; // 1 minute in milliseconds
    const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

    // Function to calculate scheduled pickup time
    const calculateScheduledPickupTime = (notification) => {
        const notificationTimestamp = moment(notification.timestamp);
        const pickupTimeStart = moment(notificationTimestamp).set({ hour: 8, minute: 0, second: 0 });
        const pickupTimeEnd = moment(notificationTimestamp).set({ hour: 12, minute: 0, second: 0 });
        const nextDayPickupTime = moment(notificationTimestamp).add(1, "days").set({ hour: 9, minute: 0, second: 0 });

        if (notificationTimestamp.isBetween(pickupTimeStart, pickupTimeEnd)) {
            // If notification received between 8 AM and 12 PM, add 5 hours to it
            return notificationTimestamp.add(5, "hours").format();
        } else {
            // Otherwise, set pickup time to next day 9 AM
            return nextDayPickupTime.format();
        }
    };

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

                // Calculate scheduled pickup time for each notification
                const notificationsWithScheduledTime = data.map((notification) => ({
                    ...notification,
                    scheduledPickupTime: calculateScheduledPickupTime(notification),
                }));

                setNotifications(notificationsWithScheduledTime);
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
