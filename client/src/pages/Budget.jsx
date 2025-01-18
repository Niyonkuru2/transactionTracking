import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddTransactionModal from "../components/Transactions/AddTransactionModal";
import Loading from "../components/Shared/Loader";

const BudgetManagement = () => {
  const [budget, setBudget] = useState(0);  // Budget calculated from income - expenses
  const [spent, setSpent] = useState(0);  // Total expenses
  const [income, setIncome] = useState(0);  // Total income
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Track loading state

  // Fetch transactions data from the API
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const transactions = response.data.transactions;
          
          let totalIncome = 0;
          let totalExpenses = 0;

          // Calculate total income and expenses
          transactions.forEach((transaction) => {
            if (transaction.type === "Income") {
              totalIncome += transaction.amount;
            } else if (transaction.type === "Expense") {
              totalExpenses += transaction.amount;
            }
          });

          // Set the income, expenses, and budget
          setIncome(totalIncome);
          setSpent(totalExpenses);
          setBudget(totalIncome - totalExpenses);  // Budget = Income - Expenses
        }

        setIsLoading(false);  // Once the data is fetched, set loading to false
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setIsLoading(false);  // Stop loading even if there's an error
      }
    };

    fetchTransactionData();
  }, []);

  // Handle budget notifications using React Toastify
  useEffect(() => {
    //show notifications after data is fetched
    if (income === 0 || spent === 0) {
      return;  // Prevent running the logic if income or spent data is not available yet
    }

    const remaining = budget;
    const budgetPercentage = budget / income;

    // Show an error if budget is zero (exceeded)
    if (remaining === 0) {
      toast.error("You have exceeded your budget!");
    } 
    // Show a warning if budget is 70% or less of income
    else if (budgetPercentage <= 0.7) {
      toast.warn("You are approaching your budget limit, try to minimize your expenses.");
    }
  }, [budget, spent, income]);

  // Handle adding a transaction
  const handleAddTransaction = (transaction) => {
    if (transaction.type === "Expense") {
      setSpent((prev) => prev + parseFloat(transaction.amount));
    } else if (transaction.type === "Income") {
      setIncome((prev) => prev + parseFloat(transaction.amount));
    }
    // Update budget dynamically after adding a transaction
    setBudget(income - spent);
  };

  // Show loading spinner if data is being fetched
  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Management</h1>

      {/* Budget Summary */}
      <div className="mb-4">
        <p>Income: ${income.toLocaleString()}</p>
        <p>Expenses: ${spent.toLocaleString()}</p>
        <p>Remaining Budget: ${Math.max(budget, 0).toLocaleString()}</p>
      </div>

      {/* Add Expense Button */}
      <div className="mb-4">
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
  );
};

export default BudgetManagement;
