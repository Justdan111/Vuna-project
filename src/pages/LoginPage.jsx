import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginUser } from "../api/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-back flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-[90%] sm:w-[50%] max-w-[500px] rounded-[10px] flex flex-col justify-center items-center gap-8 px-10 py-8"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <h1 className="text-[#ccc] text-[32px] font-semibold">ADMIN LOGIN</h1>

        <div className="w-full flex flex-col gap-6">
          {/* Email input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full h-[60px] px-4 text-[18px] text-white bg-transparent border-2 border-white border-opacity-50 rounded-[8px] outline-none focus:border-blue-500 placeholder-transparent"
              placeholder=" "  // must be a space
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-4 text-[18px] text-[#ABAFB1] transition-all duration-200 ease-in-out
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-[18px]
                peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-blue-400
                peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[14px] peer-[&:not(:placeholder-shown)]:text-blue-400
                bg-[rgba(0,0,0,0.7)] px-1"
            >
              Veritas Email
            </label>
          </div>


          {/* Password input with eye toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full h-[60px] px-4 pr-12 text-[18px] text-white bg-transparent border-2 border-white border-opacity-50 rounded-[8px] outline-none focus:border-blue-500 placeholder-transparent"
            placeholder=" "  // must be a space
            required
          />
          <label
            htmlFor="password"
            className="absolute left-4 top-4 text-[18px] text-[#ABAFB1] transition-all duration-200 ease-in-out
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-[18px]
              peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-blue-400
              peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-[14px] peer-[&:not(:placeholder-shown)]:text-blue-400
              bg-[rgba(0,0,0,0.7)] px-1"
          >
            Password
          </label>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>


          {/* Error message */}
          {error && (
            <p className="text-red-400 text-center text-[16px]">{error}</p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-[150px] mx-auto px-[16px] py-[14px] bg-[#32936F] text-white rounded-[10px] hover:bg-[#277a5c] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
