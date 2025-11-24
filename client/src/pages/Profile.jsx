import { useState } from "react";
import useTheme from "../hooks/useTheme";
import { updateProfile } from "../api/user";
import swal from "sweetalert";

export default function Profile({ user, setUser }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    name: user?.name,
    email: user?.email,
    profilePhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, profilePhoto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    if (form.profilePhoto) data.append("profilePhoto", form.profilePhoto);

    setIsLoading(true);

    try {
      const res = await updateProfile(data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      swal("Profile Updated", "Your profile is now up-to-date!", "success");
    } catch (err) {
      swal(
        "Update failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen w-full transition-colors duration-300 
        ${isDark ? "bg-[#0d0f18]" : "bg-[#f7f7ff]"}`}
    >
      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div
          className={`w-full max-w-lg rounded-3xl p-10 animate-fadeIn shadow-xl border 
          transition-all duration-300
          ${
            isDark
              ? "bg-[#141726]/90 border-[#2c3150] backdrop-blur-xl"
              : "bg-white/80 border-[#e5e6fb] backdrop-blur-xl"
          }`}
        >
          {/* Title */}
          <h2
            className={`text-3xl font-bold text-center mb-6 
            ${isDark ? "text-[#b8b9ff]" : "text-[#5a5dcf]"}`}
          >
            Your Profile
          </h2>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={
                  form.profilePhoto
                    ? URL.createObjectURL(form.profilePhoto)
                    : user.profilePic || "/default-avatar.png"
                }
                alt="profile"
                className={`w-36 h-36 rounded-full object-cover shadow-md border-4 
                ${
                  isDark
                    ? "border-[#2d3050] shadow-[#1f223a]"
                    : "border-[#dcdcff] shadow-[#e6e8ff]"
                }`}
              />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload */}
            <div className="text-center">
              <label
                className={`block text-sm mb-1 
                ${isDark ? "text-gray-300" : "text-gray-500"}`}
              >
                Change Profile Photo
              </label>

              <input
                type="file"
                onChange={handleFile}
                className={`
                  text-sm cursor-pointer rounded-lg
                  file:px-4 file:py-2 file:rounded-lg file:border-none
                  file:text-white file:cursor-pointer
                  transition
                  ${
                    isDark
                      ? "file:bg-[#6b6fff] text-[#dadaff]"
                      : "file:bg-brand text-[#5a5dcf]"
                  }
                `}
              />
            </div>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className={`w-full p-3 rounded-xl border shadow-sm transition
                focus:ring-2 focus:outline-none
                ${
                  isDark
                    ? "bg-[#1b1e2d] border-[#2f3357] text-gray-200 focus:ring-[#7f82ff]"
                    : "bg-white border-[#ddddef] text-gray-700 focus:ring-brand"
                }`}
            />

            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-3 rounded-xl border shadow-sm transition
                focus:ring-2 focus:outline-none
                ${
                  isDark
                    ? "bg-[#1b1e2d] border-[#2f3357] text-gray-200 focus:ring-[#7f82ff]"
                    : "bg-white border-[#ddddef] text-gray-700 focus:ring-brand"
                }`}
            />

            {/* Submit Button */}
            <button
              className={`w-full mt-4 py-3 rounded-xl font-medium text-white shadow-md transition
                ${
                  isDark
                    ? "bg-[#7f82ff] hover:bg-[#9a9dff]"
                    : "bg-brand hover:bg-[#5f63e6]"
                }`}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
