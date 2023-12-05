import React, { useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNotifications } from '../contexts/NotificationContext';
import '../styles/Notifications.css';

// ... (your existing imports)

const Notifications = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="notification-container">
      <div className="notification-icon" onClick={handleDropdownToggle}>
        <NotificationsNoneOutlinedIcon />
        {unreadCount > 0 && <div className="unread-badge">{unreadCount}</div>}
      </div>
      <div className={`notification-dropdown ${isDropdownVisible ? 'show' : ''}`}>
        <div className="notification-dropdown-header">Your notifications</div>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={notification.id || index}
              className={`notification-dropdown-item ${notification.unread ? 'unread' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
              {notification.unread ? (
                <div className="unread-icon">!</div>
              ) : (
                <CheckCircleOutlineIcon className="read-icon" />
              )}
              {notification.message}
            </div>
          ))
        ) : (
          <div className="empty-mailbox-message">Mailbox is empty</div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
