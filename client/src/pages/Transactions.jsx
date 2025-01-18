import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import EditTransaction from "../components/Transactions/EditTransactionModal";
import axios from "axios";
import Loading from "../components/Shared/Loader";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
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
          setTransactions(response.data.transactions);
        } else {
          console.error("Error fetching transactions:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/transaction/delete/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTransactions((prev) => prev.filter((transaction) => transaction._id !== transactionId));
      } else {
        console.error("Error deleting transaction:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) => (transaction._id === updatedTransaction._id ? updatedTransaction : transaction))
    );
    setIsEditModalOpen(false);
  };

  const accountsSummary = [
    {
      account: "Bank",
      income: transactions.filter((t) => t.account === "Bank" && t.type === "Income").reduce((sum, t) => sum + t.amount, 0),
      expense: transactions.filter((t) => t.account === "Bank" && t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
    },
    {
      account: "Cash",
      income: transactions.filter((t) => t.account === "Cash" && t.type === "Income").reduce((sum, t) => sum + t.amount, 0),
      expense: transactions.filter((t) => t.account === "Cash" && t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
    },
    {
      account: "Mobile Money",
      income: transactions.filter((t) => t.account === "Mobile Money" && t.type === "Income").reduce((sum, t) => sum + t.amount, 0),
      expense: transactions.filter((t) => t.account === "Mobile Money" && t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {/* Transaction Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Transaction List</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Account</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-right">Edit</th>
                <th className="py-3 px-6 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{new Date(transaction.date).toLocaleDateString("en-GB")}</td>
                  <td className="py-3 px-6 text-left">{transaction.type}</td>
                  <td className="py-3 px-6 text-left">{transaction.account}</td>
                  <td className="py-3 px-6 text-right">${transaction.amount.toLocaleString()}</td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    </td>
                    <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Visualization (hidden on small screens) */}
      <div className="mb-6 hidden lg:block">
        <h2 className="text-xl font-bold mb-4">Account Summary</h2>
        <div className="w-full h-72 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accountsSummary} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="account" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4caf50" name="Income" />
              <Bar dataKey="expense" fill="#f44336" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Edit Transaction Modal */}
      {isEditModalOpen && (
        <EditTransaction
          transaction={selectedTransaction}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Transactions;
