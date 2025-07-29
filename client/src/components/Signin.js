import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../components/image.png";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "https://note-backend-gdum.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to /home
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <>
      <div className="container d-flex" id="signUp-main">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          id="signUp-left"
        >
          <h3 className="mb-4 align-self-start">Login to your account</h3>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && (
              <p className="text-danger mb-2" style={{ fontSize: "0.9rem" }}>
                {errorMsg}
              </p>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>

          {/* Signup redirect option */}
          <p className="mt-3">
            Need an account ?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Create one
            </span>
          </p>
        </div>

        {/* Right Image Side */}
        <div
          className="d-none d-md-flex align-items-center justify-content-center"
          id="signUp-right"
        >
          <img
            src={image}
            alt="signinImage"
            id="signUp-image"
            style={{ borderRadius: "1rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
