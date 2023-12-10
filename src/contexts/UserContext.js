import React, { createContext, useContext, useState } from "react";

export const UserManagementContext = createContext();

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

export function UserManagementProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();

  const isAuthenticated = Boolean(localStorage.getItem("authenticate"));

  const addUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const data = await response.json();
        throw new Error(data?.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (username) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/users/${username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchUserByUsername(username) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(username, updatedUser) {
    if (!isAuthenticated || !token) {
      return;
    }

    try {
      const newUpdatedUser = {
        username: username,
        fullName: updatedUser.newFullName,
        region: updatedUser.newRegion,
        password: updatedUser.newPassword,
        repeatPassword: updatedUser.newRepeatPassword,
      };

      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/users/${username}`, {
        method: "PATCH",
        body: JSON.stringify(newUpdatedUser),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        const data = await res.json();
        throw new Error(data?.message || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserManagementContext.Provider
      value={{ isLoading, addUser, deleteUser, user, fetchUserByUsername, updateUser }}
    >
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error("useUserManagement must be used within a UserManagementProvider");
  }
  return context;
}