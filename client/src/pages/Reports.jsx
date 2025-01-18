import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Shared/Loader";
import {toast} from "react-toastify"
import ReportGenerator from "../components/Reports/ReportGenerator";

const ReportsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) {
         toast.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setTransactions(response.data.transactions);
        }
      } catch (err) {
        toast.error("Error fetching transactions:",err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Show loading spinner or error message
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <ReportGenerator transactions={transactions} />
    </div>
  );
};

export default ReportsPage;
