import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../components/image.png";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // 1. Send OTP to email
  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "https://note-backend-gdum.onrender.com/api/auth/send-otp",
        {
          email,
        }
      );
      setOtp(res.data.otp);
      setStep(2);
    } catch (err) {
      setError("Failed to send OTP");
    }
  };

  // 2. Verify entered OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://note-backend-gdum.onrender.com/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      if (res.data.message === "Email verified successfully") {
        setStep(3);
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("OTP verification failed");
    }
  };

  // 3. Signup user
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "https://note-backend-gdum.onrender.com/api/auth/create-password",
        {
          email,
          password,
        }
      );

      navigate("/signin"); // Redirect after signup
    } catch (err) {
      setError("Signup failed");
    }
  };
  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <div className="container d-flex" id="signUp-main">
      {/* Left Side - Form Area */}
      <div
        className="d-flex align-items-center justify-content-center flex-column "
        id="signUp-left"
      >
        <h3 className="mb-4">Signup</h3>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-control mb-3"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <button className="btn btn-success" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="form-control mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </>
        )}

        {error && <p className="text-danger mt-3">{error}</p>}
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <span
            onClick={handleSignInClick}
            style={{
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign in
          </span>
        </p>
      </div>

      {/* Right Side - Image Area */}
      <div
        className="d-flex align-items-center justify-content-center "
        id="signUp-right"
      >
        <img
          src={image}
          alt="signupImage"
          id="signUp-image"
          style={{ borderRadius: "1rem" }}
        />
      </div>
    </div>
  );
};

export default Signup;
