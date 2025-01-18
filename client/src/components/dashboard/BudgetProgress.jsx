const BudgetProgress = ({ budget, spent }) => {
  const progressPercentage = Math.min((spent / budget) * 100, 100);
  const isOverBudget = spent > budget;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-700">Budget Progress</h2>

      <div className="mt-4">
        {/* Budget Summary */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Budget:</span> ${budget.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Spent:</span> ${spent.toLocaleString()}
        </p>
        <p
          className={`text-sm font-semibold mt-2 ${
            isOverBudget ? "text-red-500" : "text-gray-700"
          }`}
        >
          {isOverBudget
            ? `Over budget by $${(spent - budget).toLocaleString()}`
            : `Remaining: $${(budget - spent).toLocaleString()}`}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
        <div
          className={`h-4 rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetProgress;
