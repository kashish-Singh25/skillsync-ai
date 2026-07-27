import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
    disabled = false,
  }) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-5">
      <label className="block mb-2 font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">

      <input
  name={name}
  type={inputType}
  placeholder={placeholder}
  value={value}
  onChange={onChange}
  required={required}
  disabled={disabled}
  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
/>

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}

      </div>
    </div>
  );
}

export default Input;