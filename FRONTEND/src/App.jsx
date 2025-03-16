import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import CampusMap from "./pages/CampusMap";
import LabIssues from "./pages/LabIssues";
import NightMarket from "./pages/NightMarket";
import RoomAllocation from "./pages/RoomAllocation";
import Safety from "./pages/Safety";
import Security from "./pages/Security";
import SOS from "./pages/SOS";
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
          <Route path="/campus-map" element={<CampusMap />} />
          <Route path="/lab-issues" element={<LabIssues />} />
          <Route path="/night-market" element={<NightMarket />} />
          <Route path="/room-allocation" element={<RoomAllocation />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/security" element={<Security />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;