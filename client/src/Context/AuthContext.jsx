import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const AuthContext = ({ children }) => {
  const API_URL = "http://localhost:1230/api/auth";
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return setUser(null);
        }
        const res = await axios.get(`${API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.data.success) {
          console.log(res.data.message);
          setLoading(false)
          return setUser(null);
        }
        console.log(res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log(error.message);
      } finally{
        setLoading(false)
      }
    };
    verifyAuth();
  }, []);

  if(loading){
    return;
  }

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const userAuth = () => useContext(UserContext);

export default AuthContext;
