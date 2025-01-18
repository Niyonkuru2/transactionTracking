import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const AddTransactionModal = ({ isOpen, onClose, onSave }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false); 
  const [formData, setFormData] = useState({
    type: "Income",
    account: "Bank",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Get the token from localStorage (assuming the user is logged in)
      const token = JSON.parse(localStorage.getItem("user"))?.token;
  
      if (!token) {
        toast.error("Token is missing.");
        setIsLoading(false);
        return
      }
      
  
      //  API call to save the transaction with the token in Authorization header
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/transaction/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true,
        }
      );
  
      // Check if the transaction was successfully saved
      if (response.data.success) {
        navigate("/transactions")
        if (onSave) onSave(response.data);
        onClose(); // Close the modal after saving
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Add New Transaction</h2>
        </div>
          <form onSubmit={handleSubmit} className="p-4">
            {/* Transaction Type */}
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Account */}
            <div className="mb-4">
              <label htmlFor="account" className="block text-sm font-medium text-gray-700">
                Account
              </label>
              <select
                id="account"
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
                <option value="Mobile Money">Mobile Money</option>
              </select>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="border border-gray-300 rounded-md shadow-sm px-4 py-2 mr-4 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 ${isLoading && "cursor-not-allowed opacity-50"}`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
