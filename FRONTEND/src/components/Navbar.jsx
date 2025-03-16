import { Link } from "react-router-dom";
import { FaHome, FaUserCheck, FaMap, FaFlask, FaStore, FaBed, FaShieldAlt, FaLock, FaExclamationTriangle, FaCalendarAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">Campus AI</h1>
      <ul className="space-y-4">
        <li><Link to="/" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaHome /><span>Home</span></Link></li>
        <li><Link to="/attendance" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaUserCheck /><span>Attendance</span></Link></li>
        <li><Link to="/campus-map" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaMap /><span>Campus Map</span></Link></li>
        <li><Link to="/lab-issues" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaFlask /><span>Lab Issues</span></Link></li>
        <li><Link to="/night-market" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaStore /><span>Night Market</span></Link></li>
        <li><Link to="/room-allocation" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaBed /><span>Room Allocation</span></Link></li>
        <li><Link to="/safety" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaShieldAlt /><span>Safety</span></Link></li>
        <li><Link to="/security" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaLock /><span>Security</span></Link></li>
        <li><Link to="/sos" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaExclamationTriangle /><span>SOS</span></Link></li>
        <li><Link to="/timetable" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"><FaCalendarAlt /><span>Time Table</span></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;