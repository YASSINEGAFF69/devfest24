"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'; // Ensure you import Image from next/image
import GaugeChart from 'react-gauge-chart';
import DeviceUsageChart from './DeviceUsageChart';
import Notification from './Notification'; // Ensure this path is correct

type NotificationType = {
  id: number;
  message: string;
  details?: string;
};

export default function Home() {
  const [percentageEnergy, setPercentageEnergy] = useState(0.5); // Energy gauge
  const [percentageWater, setPercentageWater] = useState(0.7); // Water gauge
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<NotificationType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        message: "*Alert:* HVAC may need maintenance; washing_machine overconsuming!",
        details: `* *HVAC:* Consider scheduling a professional HVAC inspection to check for leaks, filter cleanliness, and overall efficiency.
        * *Washing Machine:* Try washing clothes in cold water and air drying whenever possible. Consider using a shorter cycle for smaller loads.`
      };
      setNotifications([newNotification]);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const closeNotification = (id: number) => {
    const notificationToMove = notifications.find(notification => notification.id === id);
    if (notificationToMove) {
      setNotificationHistory(prevHistory => [...prevHistory, notificationToMove]);
    }
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleApply = (id: number) => {
    closeNotification(id);
  };

  return (
    <div className="container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src="https://i.ibb.co/rb25mCP/Design-sans-titre-2.png" alt="Logo" width={150} height={50} />
      </div>

      <h1 className="title">Energy & Water Consumption Monitor</h1>

      {/* Device Usage Chart */}
      <DeviceUsageChart />

      {/* Gauges for Energy and Water */}
      <div className="gauge-container">
        <div className="gauge">
          <h2>Water:</h2>
          <GaugeChart
            id="gauge-chart-energy"
            nrOfLevels={20}
            percent={percentageEnergy}
            textColor="#FFFFFF"
            formatTextValue={value => `${value}%`}
          />
        </div>
        <div className="gauge">
          <h2>Energy:</h2>
          <GaugeChart
            id="gauge-chart-water"
            nrOfLevels={20}
            percent={percentageWater}
            textColor="#FFFFFF"
            formatTextValue={value => `${value}%`}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="notifications">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => closeNotification(notification.id)}
            onApply={() => handleApply(notification.id)}
          />
        ))}
      </div>

      {/* Notification History */}
      <h2 className="history-title">Notification History:</h2>
      <div className="history">
        {notificationHistory.map(notification => (
          <div key={notification.id} className="history-item">
            <p className='text-gray-700'>{notification.message}</p>
            {notification.details && (
              <p className="details">Details:<br/> {notification.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
