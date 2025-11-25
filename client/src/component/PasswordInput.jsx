import { useState } from "react";
import { Icon } from "@iconify/react";
import useTheme from "../hooks/useTheme";


export default function PasswordInput({ label, name, register }) {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme()

  const isDark = theme === "dark"

  return (
    <div className="relative w-full mb-2">
      <input
        {...register}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={label}
        className={`w-full p-3 rounded-xl border ${isDark ? "placeholder:text-[gainsboro]" : "placeholder:text-black"} border-accent focus:outline-none focus:ring-2 focus:ring-brand`} 
      />

      <Icon
        icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
        width={24}
        className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-gray-700 transition"
        onClick={() => setShowPassword((prev) => !prev)}
      />
    </div>
  );
}
