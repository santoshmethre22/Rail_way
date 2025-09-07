import React, { useState } from "react";
import { Input } from "../index.js"; 
import authService from "../../server/auth.js";
import { login } from "../../store/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    let newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(null);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setApiError(null);

    try {
      const data = await authService.login({
        email: form.email,
        password: form.password,
      });

      if (!data.user) throw errors;
      dispatch(login({ user: data?.user }));

      setForm({ email: "", password: "" });
      setSuccess("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        error.response?.data?.message || error.message || "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {apiError && (
            <p className="text-xs text-red-600 text-center">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 transition"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 text-sm text-center mt-4">{success}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
