import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import BASE_URL from "../constant";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!form?.email || !form?.password) {
      return toast.error("Please enter valid email address & password");
    }

    const data = {
      email: form.email,
      password: form.password,
    };
    console.log("data", data);
    axios
      .post(BASE_URL + "/api/auth/login", data)
      .then(() => {
        toast.success("Logged in successfully");
        return navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Failed to log in");
      });
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Toaster />
        <Form className="col-4">
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              name="email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
          <a className="ps-5" href="/register">
            New user? Register here...
          </a>
        </Form>
      </div>
    </>
  );
}

export default Login;
