import { useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/Shared/Loader";

// API call function to reset the password
const resetPassword = async (token,newPassword) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${token}`,
    { newPassword }
  );
  return response.data;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await resetPassword(token, newPassword);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center absolute inset-0 bg-white bg-opacity-50 z-10">
          <Loading />
        </div>
      ) : (
        <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg z-20">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Reset Password</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="newPassword"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your new password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 border border-gray-300 rounded-md shadow-sm px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your new password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-sm hover:bg-blue-600 w-full"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
