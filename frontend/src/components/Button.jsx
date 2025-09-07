import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary", // default is primary
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "px-5 py-2 rounded-2xl font-semibold transition-transform " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "active:scale-95";

  const variants = {
    nav: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variantClasses} ${disabled ? disabledStyles : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
