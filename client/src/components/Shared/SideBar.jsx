import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCreditCard, FaChartBar, FaMoneyBillWave } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-700 text-white ${isOpen ? "w-64" : "w-16"} h-screen fixed top-0 left-0 transition-all duration-300 flex flex-col z-50`}
      >
        {/* Toggle Button */}
        <div
          className={`p-4 absolute top-4 left-[-30px] ${isOpen ? "left-64" : "left-16"} transition-all duration-300 z-50 toggle`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow mt-16"> 
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center p-4 hover:bg-blue-800 transition"
              >
                <FaHome className="h-6 w-6" />
                {isOpen && <span className="ml-4">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className="flex items-center p-4 hover:bg-blue-800 transition"
              >
                <FaCreditCard className="h-6 w-6" />
                {isOpen && <span className="ml-4">Transactions</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/budget"
                className="flex items-center p-4 hover:bg-blue-800 transition"
              >
                <FaMoneyBillWave className="h-6 w-6" />
                {isOpen && <span className="ml-4">Budget</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="flex items-center p-4 hover:bg-blue-800 transition"
              >
                <FaChartBar className="h-6 w-6" />
                {isOpen && <span className="ml-4">Reports</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow p-4 mt-16 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}  // Dynamically adjust the left margin based on the sidebar state
      >
        {/* Main content display */}
      </div>
    </div>
  );
};

export default Sidebar;
