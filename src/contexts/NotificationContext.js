import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./LoginAuthContext";
import moment from "moment"; // Import moment.js for date manipulation 

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";
const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // New state for unread count
    const { isAuthenticated, token } = useAuth();
    const fetchInterval = 60000; // 1 minute in milliseconds

    // Function to calculate scheduled pickup time
    const calculateScheduledPickupTime = (notification) => {
        const notificationTimestamp = moment(notification.timestamp);
        const pickupTimeStart = moment(notificationTimestamp).set({ hour: 8, minute: 0, second: 0 });
        const pickupTimeEnd = moment(notificationTimestamp).set({ hour: 12, minute: 0, second: 0 });
        const nextDayPickupTime = moment(notificationTimestamp).add(1, "days").set({ hour: 9, minute: 0, second: 0 });

        if (notificationTimestamp.isBetween(pickupTimeStart, pickupTimeEnd)) {
            return notificationTimestamp.add(5, "hours").format();
        } else {
            return nextDayPickupTime.format();
        }
    };

    // Function to update unread count
    const updateUnreadCount = (notifications) => {
        const newUnreadCount = notifications.filter((notification) => notification.unread).length;
        setUnreadCount(newUnreadCount);
    };

    // Function to mark a notification as read
    const markAsRead = (notificationId) => {
        const updatedNotifications = notifications.map((notification) =>
            notification.id === notificationId ? { ...notification, unread: false } : notification
        );
        setNotifications(updatedNotifications);
        updateUnreadCount(updatedNotifications);
    };

    useEffect(() => {
        let intervalId;

        async function fetchNotifications() {
            if (!isAuthenticated || !token) {
                return;
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

                const notificationsWithScheduledTime = data.map((item) => ({
                    ...item,
                    id: item.binId, // Or use a unique identifier from your API
                    message: `Bin ${item.binId} reached ${item.levelValue}% fill level`,
                    scheduledPickupTime: calculateScheduledPickupTime(item),
                    unread: true, // Assuming all notifications are initially unread
                }))



                setNotifications(notificationsWithScheduledTime);
                updateUnreadCount(notificationsWithScheduledTime);

            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }

        if (isAuthenticated) {
            fetchNotifications();
            intervalId = setInterval(fetchNotifications, fetchInterval);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [token, isAuthenticated]);

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
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