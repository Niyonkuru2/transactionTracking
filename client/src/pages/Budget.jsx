import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddTransactionModal from "../components/Transactions/AddTransactionModal";
import Loading from "../components/Shared/Loader";

const BudgetManagement = () => {
  const [budget, setBudget] = useState(0); // Budget calculated from income - expenses
  const [spent, setSpent] = useState(0); // Total expenses
  const [income, setIncome] = useState(0); // Total income
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/transaction/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          const transactions = response.data.transactions;

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
          setSpent(totalExpenses);
          setBudget(totalIncome - totalExpenses);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  useEffect(() => {
    if (income === 0 || spent === 0) {
      return;
    }

    const remaining = budget;
    const budgetPercentage = budget / income;

    if (remaining === 0) {
      toast.error("You have exceeded your budget!");
    } else if (budgetPercentage <= 0.7) {
      toast.warn(
        "You are approaching your budget limit, try to minimize your expenses."
      );
    }
  }, [budget, spent, income]);

  const handleAddTransaction = (transaction) => {
    if (transaction.type === "Expense") {
      setSpent((prev) => prev + parseFloat(transaction.amount));
    } else if (transaction.type === "Income") {
      setIncome((prev) => prev + parseFloat(transaction.amount));
    }
    setBudget(income - spent);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Budget Management
        </h1>

        {/* Budget Summary */}
        <div className="mb-4 text-center">
          <p>Income: ${income.toLocaleString()}</p>
          <p>Expenses: ${spent.toLocaleString()}</p>
          <p>Remaining Budget: ${Math.max(budget, 0).toLocaleString()}</p>
        </div>

        {/* Add Expense Button */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Transaction
          </button>
        </div>

        {/* Add Transaction Modal */}
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddTransaction}
        />
      </div>
    </div>
  );
};

export default BudgetManagement;
