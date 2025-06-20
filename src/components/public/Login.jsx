import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (userData) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/login", userData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert("Login successful! 🎉");
      console.log("User logged in:", data);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error.response?.data || error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute top-5 left-5">
        <Link to="/">
          <img src="/src/assets/images/logo.png" alt="Trek Logo" className="h-25" />
        </Link>
      </div>
      <div className="relative w-full max-w-4xl flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img
            src="/src/assets/images/login2.jpg"
            alt="Trek Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login to Your Account</h2>
          <p className="mb-6 text-gray-300">Login with Email</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email"
              placeholder="Enter Email or Username"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password"
              placeholder="Enter Password"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className="text-sm text-red-300 hover:underline">Forgot your password?</a>

            <button 
              type="submit" 
              className="w-full rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-500"></span>
            <span className="text-gray-400">OR</span>
            <span className="h-px w-16 bg-gray-500"></span>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700"><FaGoogle size={20} /></button>
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700"><FaFacebook size={20} /></button>
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700"><FaApple size={20} /></button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-300">
            Don't have an account? <a href="/register" className="text-red-300 hover:underline">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
