import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "nav", // nav | primary | secondary | danger
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    nav: "bg-transparent text-white hover:bg-white hover:text-blue-600 focus:ring-blue-400", // 🔹 navbar style
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
