import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = "Username is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    try {
      await axios.post("/api/users/register", form);
      setSuccess(true);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setApiError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="register-form">
      <div>
        <label>Username</label>
        <input name="username" value={form.username} onChange={handleChange} />
        {errors.username && <span role="alert">{errors.username}</span>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      <button type="submit">Register</button>
      {apiError && <div role="alert">{apiError}</div>}
      {success && <div>Registration successful!</div>}
    </form>
  );
}
