import { useEffect, useState } from "react";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import Loading from "../components/Shared/Loader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay or fetch operation
    const loadData = async () => {
      // Example: Simulate fetching data with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);  // Once data is fetched set loading to false
    };

    loadData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Show loading spinner if page is loading */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-6">
          <DashboardOverview />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
