// src/pages/Settings.jsx
import { Icon } from "@iconify/react";
import swal from "sweetalert";
import { useState } from "react";
import api from "../api/axios";
import { deleteAccount } from "../api/user";
import PasswordInput from "../component/PasswordInput";
import useTheme from "../hooks/useTheme";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleDeleteAccount = async () => {
    swal({
      title: "Delete Account?",
      text: "This action cannot be undone. All your tasks will be deleted.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        try {
          await deleteAccount();

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          swal(
            "Account deleted",
            "Your account has been removed permanently.",
            "success"
          );

          window.location.href = "/signup";
        } catch (error) {
          swal(
            "Error",
            error?.response?.data?.message || "Something went wrong",
            "error"
          );
        }
      }
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return swal("Error", "All fields are required", "error");
    }

    if (form.newPassword !== form.confirmPassword) {
      return swal("Error", "New passwords do not match", "error");
    }

    try {
      await api.put("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.confirmPassword,
      });

      swal("Success", "Password updated successfully!", "success");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      swal(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div
      className={`flex w-full min-h-screen justify-center py-12 px-6 transition-colors duration-300 ${
        isDark ? "bg-[#050816]" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 border shadow-xl transition-colors duration-300 ${
          isDark
            ? "bg-[#0b1020]/95 border-[#252b47] text-gray-100"
            : "bg-white border-gray-200 text-gray-900"
        }`}
      >
        {/* PAGE TITLE */}
        <h1
          className={`text-2xl font-bold mb-6 ${
            isDark ? "text-[#a5b4fc]" : "text-accent"
          }`}
        >
          Settings
        </h1>

        {/* ============= APPEARANCE ============= */}
        <section
          className={`mb-10 pb-8 border-b transition-colors duration-300 ${
            isDark ? "border-[#252b47]" : "border-b-brand"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-gray-200" : "text-[#6668a3]"
            }`}
          >
            Appearance
          </h2>

          <div
            className={`flex items-center justify-between rounded-xl p-4 shadow transition-colors duration-300 ${
              isDark ? "bg-[#111827]" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                icon="mdi:weather-night"
                width={28}
                className={isDark ? "text-yellow-300" : "text-accent"}
              />
              <span
                className={`font-medium ${
                  isDark ? "text-gray-100" : "text-gray-700"
                }`}
              >
                Dark Mode
              </span>
            </div>

            {/* TOGGLE SWITCH */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${
                isDark ? "bg-[#4f46e5]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
                  isDark ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* ============= SECURITY: PASSWORD ============= */}
        <section
          className={`mb-10 pb-8 border-b transition-colors duration-300 ${
            isDark ? "border-[#252b47]" : "border-b-brand"
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-gray-200" : "text-[#6668a3]"
            }`}
          >
            Security
          </h2>

          <div
            className={`rounded-xl p-6 border transition-colors duration-300 ${
              isDark
                ? "bg-[#020617] border-[#1d233a]"
                : "bg-gray-50 border-accent"
            }`}
          >
            <h3
              className={`font-medium mb-3 ${
                isDark ? "text-[#a5b4fc]" : "text-brand"
              }`}
            >
              Reset Password
            </h3>

            <form onSubmit={handlePasswordChange} className="space-y-3">
              <PasswordInput
                label="Current Password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
              />
              <PasswordInput
                label="New Password"
                name="newPassword"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
              />
              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
              />

              <button
                type="submit"
                className={`w-full py-3 rounded-xl mt-2 font-medium cursor-pointer transition-colors duration-300 ${
                  isDark
                    ? "bg-[#4f46e5] hover:bg-[#6366f1] text-white"
                    : "bg-accent hover:bg-[#4246d2] text-white"
                }`}
              >
                Update Password
              </button>
            </form>
          </div>
        </section>

        {/* ============= DANGER ZONE ============= */}
        <section>
          <h2 className="text-lg font-semibold text-red-500 mb-4">
            Danger Zone
          </h2>

          <div
            className={`rounded-xl p-6 border transition-colors duration-300 ${
              isDark
                ? "bg-[#1f2937] border-red-700"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className={`mb-4 ${isDark ? "text-red-200" : "text-red-700"}`}>
              Once you delete your account, all your tasks and data will be
              permanently removed. This action cannot be undone.
            </p>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:trash-can" width={22} />
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
