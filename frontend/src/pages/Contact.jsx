import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Have questions or need help? Fill out the form below and we’ll get
          back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600">
          <p>Email: support@railwaybooking.com</p>
          <p>Phone: +91 9876543210</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
