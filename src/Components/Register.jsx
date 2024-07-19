import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../constant";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!form?.email || !form?.password || !form?.confirmPassword) {
      return toast.error("All fields are required");
    }
    if (form?.password !== form?.confirmPassword) {
      setForm({ password: "", confirmPassword: "" });
      return toast.error("Passwords do not match");
    }
    const data = {
      email: form.email,
      password: form.password,
    };
    axios
      .post(BASE_URL + "/api/auth/register", data)
      .then((response) => {
        setForm({ email: "", password: "", confirmPassword: "" });
        toast.success("User registered  successfully");
        return navigate("/dashboard");
      })
      .catch((error) => {
        setForm({ email: "", password: "", confirmPassword: "" });
        toast.error("Failed to registered user");
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Toaster />
      <Form className="col-4">
        <h1>Register</h1>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email address"
            value={form.email}
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={form.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
        <a className="ps-5" href="/login">
          Alredy Registered? Login here...
        </a>
      </Form>
    </div>
  );
}

export default Register;
