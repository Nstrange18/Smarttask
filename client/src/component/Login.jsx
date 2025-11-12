import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      console.log("✅ Logged in:", res.data);
      const {token, user} = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // redirect or store token
      window.location.href = "/";
      
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e4e3ff] to-white">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-[90%] max-w-md p-8 text-center border border-[#e1e2f1] animate-fadeIn">
        <img
          src="/smarttask-logo.png"
          alt="SmartTask"
          className="mx-auto mb-6 w-44"
        />

        <h2 className="text-2xl font-semibold text-[#6668a3] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in to manage your tasks efficiently.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9395D3] focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9395D3] focus:outline-none"
            required
          />

          <button
            type="submit"
            className="mt-3 bg-[#9395D3] hover:bg-[#6267f3] text-white font-medium rounded-xl py-3 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#6668a3] font-semibold hover:text-[#5a5dcf]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
