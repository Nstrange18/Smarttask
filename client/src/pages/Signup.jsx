import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import swal from "sweetalert";

export default function Signup({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      swal("Account Created 🎉", "Welcome to SmartTask!", "success");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";

      setIsLoading(false);
    } catch (err) {
      swal(
        "Signup failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e4e3ff] to-white">
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
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border border-[#e1e2f1] rounded-xl p-3 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
            required
          />

          <button
            type="submit"
            className="mt-3 bg-brand hover:bg-[#6267f3] text-white font-medium rounded-xl py-3 transition-all duration-300 shadow-md"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
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
