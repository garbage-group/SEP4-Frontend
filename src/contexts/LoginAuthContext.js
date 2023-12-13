import { createContext, useContext, useState } from "react";

const LoginAuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  console.log("auth", isAuthenticated);

    const updateAuthInfo = (token, username, role) => {
      
        setToken(token);
        setUsername(username);
        setRole(role);
        setIsAuthenticated(true);
        localStorage.setItem("authenticate", true);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        setRole(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authenticate", false);
        localStorage.removeItem("token", token);
        localStorage.removeItem("role", role);
    };

  return (
    <LoginAuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        username,
        role,
        updateAuthInfo,
        logout,
      }}
    >
      {children}
    </LoginAuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(LoginAuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside the AuthProvider ");
  }
  return context;
};

export { AuthProvider, useAuth };
