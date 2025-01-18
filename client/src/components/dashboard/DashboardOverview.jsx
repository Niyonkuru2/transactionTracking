import { useEffect, useState } from "react";
import axios from "axios";
import BudgetProgress from "./BudgetProgress";
import {toast} from "react-toastify"

const DashboardOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [spent, setSpent] = useState(0);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setTransactions(response.data.transactions);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "Expense") {
        totalExpenses += transaction.amount;
      }
    });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setSpent(totalExpenses); // assuming 'spent' is the same as total expenses
  }, [transactions]);

  // Calculate budget status as income - expenses
  const remainingBudget = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Income */}
      <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Total Income</h2>
        <p className="text-3xl font-semibold mt-2">${income.toLocaleString()}</p>
      </div>

      {/* Total Expenses */}
      <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Total Expenses</h2>
        <p className="text-3xl font-semibold mt-2">${expenses.toLocaleString()}</p>
      </div>

      {/* Budget Status */}
      <div
        className={`p-6 rounded-lg shadow-md ${
          remainingBudget >= 0 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        <h2 className="text-lg font-bold">Budget Status</h2>
        <p className="text-3xl font-semibold mt-2">
          {remainingBudget >= 0
            ? `$${remainingBudget.toLocaleString()} remaining`
            : `Over budget by $${Math.abs(remainingBudget).toLocaleString()}`}
        </p>
      </div>

      {/* Budget Progress Component */}
      <div className="col-span-1 md:col-span-3">
        <BudgetProgress budget={income} spent={spent} />
      </div>
    </div>
  );
};

export default DashboardOverview;
