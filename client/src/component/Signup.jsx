import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );
      console.log("✅ Signup success:", res.data);
      const {token, user} = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Signup error:", err.response?.data || err.message);
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
          Create Account ✨
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join SmartTask and stay organized every day.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#9395D3] focus:outline-none"
            required
          />
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6668a3] font-semibold hover:text-[#5a5dcf]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
