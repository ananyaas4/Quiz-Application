import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginToggle = () => {
    setIsLoginVisible((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(credentials.username, credentials.password);

    if (success) {
      navigate("/quiz");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="home-container">
      {!isLoginVisible ? (
        <>
          <h1>Welcome to the Quiz App!</h1>
          <p>
            Test your knowledge and challenge yourself with our quiz. Please{" "}
            <span className="login-link" onClick={handleLoginToggle}>
              Login
            </span>{" "}
            to get started.
          </p>
        </>
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;