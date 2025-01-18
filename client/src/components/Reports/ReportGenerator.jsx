import { useState } from "react";

const ReportGenerator = ({ transactions }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "All",
  });
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate the report based on filters
  const handleGenerateReport = (e) => {
    e.preventDefault();

    const { startDate, endDate, type } = filters;

    // Filter transactions based on the selected criteria
    const results = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const isWithinDateRange =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate));
      const isTypeMatch = type === "All" || transaction.type === type;

      return isWithinDateRange && isTypeMatch;
    });

    setFilteredTransactions(results);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enter Time Range To Generate Report</h2>

      {/* Filter Form */}
      <form onSubmit={handleGenerateReport} className="space-y-4">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Transaction Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
        >
          Generate Report
        </button>
      </form>

      {/* Report Results */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Report Results</h3>
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Account</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-3 px-6 text-left">{transaction.type}</td>
                    <td className="py-3 px-6 text-left">{transaction.account}</td>
                    <td className="py-3 px-6 text-right">
                      ${transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No transactions found for the selected Time Range.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
