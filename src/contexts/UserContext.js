import React, { createContext, useContext, useState } from "react";

export const UserManagementContext = createContext();

const BASE_URL = "https://garbage-backend-service-kq2hras2oq-ey.a.run.app";

export function UserManagementProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

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
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }
      if (response.ok) {
        return data;
      } else {
        if (response.status === 409) {
          throw new Error(
            `Failed to sign up. Username: ${userData.username} already exists.`
          );
        } else if (response.status === 500) {
          throw new Error("Error code 500, Failed to sign up user.");
        } else {
          throw new Error(data?.message || "An unknown error occurred.");
        }
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`User ${username} not found.`);
        } else {
          const data = await response.json();
          throw new Error(data?.message || "An unknown error occurred.");
        }
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
      return data;
    } catch {
      console.error("User not found!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserManagementContext.Provider
      value={{ isLoading, addUser, deleteUser, fetchUserByUsername }}
    >
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error(
      "useUserManagement must be used within a UserManagementProvider"
    );
  }
  return context;
}
