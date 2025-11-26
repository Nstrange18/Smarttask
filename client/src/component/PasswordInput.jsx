import { useState } from "react";
import { Icon } from "@iconify/react";
import useTheme from "../hooks/useTheme";

export default function PasswordInput({ label, name, register }) {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex items-center w-full mb-2 rounded-lg px-2 border 
      ${isDark ? "border-accent bg-[#0f111a]" : "border-gray-300 bg-white"}`}
    >
      <input
        {...register}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={label}
        className={`w-full p-3 border-none focus:outline-none 
        ${isDark ? "bg-transparent text-white placeholder:text-gray-300" 
                : "bg-transparent text-gray-800 placeholder:text-gray-500"}
      `}
      />

      <Icon
        icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
        width={24}
        className={`ml-2 cursor-pointer transition 
        ${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
  );
}
