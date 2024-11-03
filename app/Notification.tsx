import React from 'react';

type NotificationProps = {
  message: string;
  onClose: () => void;
  onApply: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, onClose, onApply }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <div className="notification-buttons">
        <button className='close-button text-red-600' onClick={onClose}>X</button>
        <button className='apply-button' onClick={onApply}>Apply</button>
      </div>
    </div>
  );
};

export default Notification;
