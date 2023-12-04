import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './LoginAuthContext';

const BASE_URL = 'https://garbage-backend-service-kq2hras2oq-ey.a.run.app';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { token, isAuthenticated } = useAuth();
console.log('Token:', token);
console.log('Is Authenticated:', isAuthenticated);

  
  const fetchInterval = 300000; // 5 mins fetch

  const updateUnreadCount = (notifications) => {
    const newUnreadCount = notifications.filter((notification) => notification.unread).length;
    setUnreadCount(newUnreadCount);
  };

  useEffect(() => {
    let intervalId;

    const fetchNotifications = async () => {
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
    
        if (!data || !Array.isArray(data)) {
          console.error('Received invalid notifications data:', data);
          return;
        }
    
        console.log('Received data:', data);
    
        // Assuming your API response contains the necessary fields
        const notifications = data.map((item) => ({
          id: item.binId, // Or use a unique identifier from your API
          message: `Bin ${item.binId} reached ${item.levelValue}% fill level`,
          unread: true, // Assuming all notifications are initially unread
        }));
    
        setNotifications(notifications);
        updateUnreadCount(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        alert('Failed to fetch notifications: ' + error.message);
      }
    };
    
    
    
    if (isAuthenticated) {
      fetchNotifications(); // Fetch immediately if authenticated
      intervalId = setInterval(fetchNotifications, fetchInterval); // Set up polling
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval on cleanup
      }
    };
  }, [token, isAuthenticated, fetchInterval]);

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId ? { ...notification, unread: false } : notification
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  console.log('Notifications Context:', context);
  
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }

  return context;
};
