import API from "../services/api";

export default function EmployeeDashboard() {
  const clockIn = async () => {
    await API.post("/time/clock-in", { gps: "Nairobi" });
    alert("Clocked in");
  };

  const clockOut = async () => {
    await API.post("/time/clock-out");
    alert("Clocked out");
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>

      <button onClick={clockIn}>Clock In</button>
      <button onClick={clockOut}>Clock Out</button>
    </div>
  );
}
