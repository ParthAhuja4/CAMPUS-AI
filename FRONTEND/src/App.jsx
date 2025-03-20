import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Geofencing from "./pages/Geofencing";

import NightMarket from "./pages/NightMarket";

import TimeTable from "./pages/TimeTable";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/night-market" element={<NightMarket />} />
          <Route path="/geofencing" element={<Geofencing />} />

          <Route path="/timetable" element={<TimeTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
