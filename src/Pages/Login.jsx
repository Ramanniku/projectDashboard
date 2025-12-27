import React, { useState } from "react";
import backgroundImage from "../assets/bgImage/bg-13.png";
import users from "../store/LoginData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import pmsLogo from "../assets/pmsLogo.png";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username.trim() && u.password === password.trim()
    );
    if (user) {
      onLogin(user);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="glass-effect p-6 rounded-lg shadow-lg w-[720px] border border-gray-300 flex">
        {/* Left side: Logo */}
        <div className="w-1/2 flex flex-col items-center justify-center px-4">
          <img className="w-65     mb-4" src={pmsLogo} alt="PMS Logo" />
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-300 mx-4"></div>

        {/* Right side: Login Form */}
        <div className="w-1/2 text-center">
          <h2 className="text-2xl font-semibold mb-6 text-blue-900">Log In</h2>

          {/* Username */}
          <div className="mb-4 text-left">
            <label className="block text-sm mb-1">User Name</label>
            <input
              type="text"
              className="inputField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4 text-left relative">
            <label className="block text-sm mb-1">Password</label>
            <input
              type={showPassword ? "password" : "text"}
              className="inputField pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <button onClick={handleLogin} className="w-full buttonCSS">
            Login
          </button>

          <div className="flex justify-between mt-5 text-sm">
            <p className="underline font-light hover:text-blue-800 cursor-pointer">
              Forgot password
            </p>
            <p className="underline font-light hover:text-blue-800 cursor-pointer">
              Register New User
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
