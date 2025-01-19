import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Shared/Loader";
import { toast } from "react-toastify";
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

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/transaction/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setTransactions(response.data.transactions);
        }
      } catch (err) {
        toast.error("Error fetching transactions");
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Transaction Filters</h1>
        <ReportGenerator transactions={transactions} />
      </div>
    </div>
  );
};

export default ReportsPage;

