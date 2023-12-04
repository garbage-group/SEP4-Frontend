import React, { useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useNotifications } from '../contexts/NotificationContext';
import '../styles/Notifications.css'; // Link to your new CSS file

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
        {unreadCount > 0 && <div className="notification-badge">{unreadCount}</div>}
      </div>
      <div className={`notification-dropdown ${isDropdownVisible ? 'show' : ''}`}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-dropdown-item ${notification.unread ? 'unread' : ''}`}
              onClick={() => markAsRead(notification.id)}
            >
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
