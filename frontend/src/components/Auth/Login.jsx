import React, { useState } from "react";
import Input from "../index.js"; // your custom Input
import { login } from "../../store/authSlice.js"; // redux action (not used yet)

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(form.email)) {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(null);
    } else {
      setErrors({});
      console.log("Login submitted:", form);
      setSuccess("Logged in successfully!");
      setForm({ email: "", password: "" });
      // here you can dispatch(login(form)) if using redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>

        {success && <p className="text-green-600 text-sm mt-4">{success}</p>}
      </div>
    </div>
  );
}

export default Login;
