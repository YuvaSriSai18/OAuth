import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./headers.css";

export default function Headers() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5500/login/success", {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        setUserData(response.data.user);
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    } catch (error) {
      console.log(error);
      navigate('/login'); // Redirect to login on error
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logOut = () => {
    window.open("http://localhost:5500/logout", "_self");
    alert("Logged out Successfully");
    setUserData({}); // Reset user data on logout
  };

  return (
    <div>
      <header>
        <nav>
          <div className="left">
            <h2>Logo</h2>
          </div>
          <div className="right">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              {Object.keys(userData).length > 0 ? (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li onClick={logOut}>Logout</li>
                </>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}
