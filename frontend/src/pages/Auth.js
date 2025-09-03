import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Auth({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await axios.post("http://localhost:5000/register", { username, password });
        setUsername("");
        setPassword("");
        setSuccessMessage("✅ Successfully registered, please login");
        setMode("login");
        toast.success("Registration successful. Please login.");
      } else {
        const res = await axios.post("http://localhost:5000/login", { username, password });
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Logged in successfully!");
        navigate("/"); 
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Server error");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setUsername("");
    setPassword("");
    setSuccessMessage("");
  };

  return (
    <div className="auth-container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
      <p onClick={toggleMode} className="toggle-link">
        {mode === "login"
          ? "Don't have an account? Register"
          : "Already registered? Login"}
      </p>
    </div>
  );
}

export default Auth;
