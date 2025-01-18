import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Shared/SideBar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Budget from "./pages/Budget";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  // Defining routes where Sidebar, Navbar, and Footer should not appear
const noSidebarRoutes = ["/login", "/register", "/reset-password"];

// Determine if the current route should show the sidebar
const showSidebar = !noSidebarRoutes.some((route) =>
  location.pathname.startsWith(route)
);

  // PrivateRoute Component to protect routes
  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      // If not logged in, redirect to login
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      <ToastContainer />
      {/* Conditionally render Navbar */}
      {showSidebar && <Navbar />}
      <div className="flex">
        {/* Conditionally render Sidebar */}
        {showSidebar && <Sidebar />}
        <div className={`flex-grow ${showSidebar ? "p-6" : ""}`}>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
      {/* Conditionally render Footer */}
      {showSidebar && <Footer />}
    </div>
  );
}

export default App;
