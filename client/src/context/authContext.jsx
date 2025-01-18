import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (formData) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, formData, {
        withCredentials: true,
      });

      // Assuming the response contains success and token
      if (res.data.success) {
        // Store the user info and token in localStorage
        const userData = { ...res.data, token: res.data.token };
        localStorage.setItem("user", JSON.stringify(userData)); // Store user and token
        setCurrentUser(userData); // Set the user in context
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Propagate the error to be handled in the component
    }
  };

  useEffect(() => {
    if (currentUser) {
      // Optionally store in sessionStorage if it's session-specific
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
