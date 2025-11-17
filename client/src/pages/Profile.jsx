import { useState } from "react";
import Sidebar from "../component/Sidebar";
import { updateProfile } from "../api/user";
import swal from "sweetalert";

export default function Profile({ user, setUser }) {
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
      setIsLoading(false);

      swal(
        "Profile Updated",
        "Your profile has been updated successfully.",
        "success"
      );
    } catch (err) {
      setIsLoading(!isLoading);
      swal(
        "Update failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7ff]">
      <div className="relative">
        <div className="group/sidebar">
          <Sidebar />
          <div
            className="overlay hidden fixed inset-0 bg-black/40 backdrop-blur-sm 
                    opacity-0 transition duration-500 
                    group-hover/sidebar:block group-hover/sidebar:opacity-100"
          ></div>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-[#e5e6fb] shadow-xl rounded-3xl p-10 animate-fadeIn">
          {/* Title */}
          <h2 className="text-3xl font-bold text-[#5a5dcf] mb-6 text-center">
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
                className="w-36 h-36 rounded-full object-cover border-4 border-[#dcdcff] shadow-md"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* File Upload */}
            <div className="text-center">
              <label className="block text-sm text-gray-500 mb-1">
                Change Profile Photo
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="text-sm text-[#5a5dcf] file:bg-[#9395D3] file:text-white file:px-4 file:py-2 
                file:rounded-lg file:border-none cursor-pointer"
              />
            </div>

            {/* Name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#ddddef] rounded-xl shadow-sm 
              focus:ring-2 focus:ring-[#9395D3] focus:outline-none transition"
              placeholder="Name"
            />

            {/* Email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#ddddef] rounded-xl shadow-sm 
              focus:ring-2 focus:ring-[#9395D3] focus:outline-none transition"
              placeholder="Email"
            />

            {/* Update button */}
            <button
              className="w-full mt-4 py-3 rounded-xl text-white font-medium 
              bg-gradient-to-r from-[#9395D3] to-[#5a5dcf] 
              hover:opacity-90 shadow-md hover:shadow-lg transition"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
