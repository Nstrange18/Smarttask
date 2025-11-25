import { Link } from "react-router-dom";
import api from "../api/axios";
import swal from "sweetalert";
import PasswordInput from "../component/PasswordInput";
import useTheme from "../hooks/useTheme";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Signup({ setUser }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(8, "Name must be at least 8 characters").nonempty("Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6).max(16),
      })
    ),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);

      swal("Account Created 🎉", "Welcome to SmartTask!", "success");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      window.location.href = "/";
    } catch (err) {
      swal(
        "Signup failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300
        ${isDark ? "bg-[#0d0f18]" : "bg-linear-to-br from-[#e4e3ff] to-white"}`}
    >
      <div
        className={`w-[90%] max-w-md p-8 rounded-3xl shadow-2xl text-center animate-fadeIn border
          backdrop-blur-xl transition-all duration-300
          ${
            isDark
              ? "bg-[#141726]/90 border-[#2c3150] shadow-[0_0_20px_rgba(0,0,0,0.35)]"
              : "bg-white/90 border-[#e1e2f1]"
          }`}
      >
        <img
          src="/smarttask-logo.png"
          alt="SmartTask"
          className="mx-auto mb-6 w-44"
        />

        <h2
          className={`text-2xl font-semibold mb-2
            ${isDark ? "text-[#b8b9ff]" : "text-[#6668a3]"}`}
        >
          Create Account ✨
        </h2>

        <p
          className={`text-sm mb-6 
            ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          Join SmartTask and stay organized every day.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            {...register("name")}
            className={`p-3 text-sm rounded-xl border transition
              focus:ring-2 focus:outline-none
              ${
                isDark
                  ? "bg-[#1b1e2d] border-[#303456] text-gray-200 focus:ring-[#7f82ff]"
                  : "bg-white border-[#ddddef] text-gray-700 focus:ring-brand"
              }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email")}
            className={`p-3 text-sm rounded-xl border transition
              focus:ring-2 focus:outline-none
              ${
                isDark
                  ? "bg-[#1b1e2d] border-[#303456] text-gray-200 focus:ring-[#7f82ff]"
                  : "bg-white border-[#ddddef] text-gray-700 focus:ring-brand"
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <PasswordInput
            label="Password"
            name="password"
            register={register("password")}
            className={`p-3 text-sm rounded-xl border transition w-full
              focus:ring-2 focus:outline-none
              ${
                isDark
                  ? "bg-[#1b1e2d] border-[#303456] text-gray-200 focus:ring-[#7f82ff]"
                  : "bg-white border-[#e1e2f1] text-gray-700 focus:ring-brand"
              }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className={`mt-3 py-3 rounded-xl font-medium text-white transition-all duration-300 shadow-md
              ${
                isDark
                  ? "bg-[#7f82ff] hover:bg-[#9a9dff]"
                  : "bg-brand hover:bg-[#6267f3]"
              }`}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p
          className={`text-sm mt-5 
            ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-semibold transition
              ${
                isDark
                  ? "text-[#9c9eff] hover:text-[#c5c7ff]"
                  : "text-[#6668a3] hover:text-[#5a5dcf]"
              }`}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
