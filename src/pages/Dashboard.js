import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2>Employee Dashboard</h2>

      <button>Clock In</button>
      <button>Clock Out</button>

      <p>Today's Hours: 0</p>
    </div>
  );
}
import API from '../services/api';

const clockIn = async () => {
  await API.post('/time/clock-in', {
    gps: "Nairobi"
  });
};
export default function ManagerDashboard() {
  return (
    <div>
      <h2>Manager Panel</h2>
      <button>View Timesheets</button>
      <button>Approve Requests</button>
    </div>
  );
}