import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (userData) => {
    const response = await axios.post("http://localhost:3000/api/v1/auth/register", userData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert("Registration successful! 🎉");
      console.log("User registered:", data);
    },
    onError: (error) => {
      alert("Registration failed. Please try again.");
      console.error("Error:", error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match! ❌");
      return;
    }
    mutation.mutate(formData);
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
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create an Account</h2>
          <p className="mb-4 text-gray-300">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-red-300 hover:underline">Privacy Policy</a> and{" "}
            <a href="#" className="text-red-300 hover:underline">Terms of Use</a>.
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex space-x-4">
              <input 
                type="text"
                name="fname"
                placeholder="First Name"
                className="w-1/2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                value={formData.fname}
                onChange={handleChange}
                required
              />
              <input 
                type="text"
                name="lname"
                placeholder="Last Name"
                className="w-1/2 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>

            <input 
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input 
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input 
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white placeholder-gray-300 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button 
              type="submit" 
              className="w-full rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Registering..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-500"></span>
            <span className="text-gray-400">OR</span>
            <span className="h-px w-16 bg-gray-500"></span>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700">
              <FaGoogle size={20} />
            </button>
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700">
              <FaFacebook size={20} />
            </button>
            <button className="rounded-full border border-gray-500 p-3 text-red-300 hover:bg-red-700">
              <FaApple size={20} />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-red-300 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
