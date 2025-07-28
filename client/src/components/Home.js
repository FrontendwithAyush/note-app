// import React from "react";
// import image from "../components/image.png";

// const Home = () => {
//   return (
//     <>
//       <div className="container d-flex" id="signUp-main">
//         <div
//           className="d-flex align-items-center justify-content-center"
//           id="signUp-left"
//         >
//           a
//         </div>
//         <div
//           className="d-flex align-items-center justify-content-center"
//           id="signUp-right"
//         >
//           <img
//             src={image}
//             alt="signupImage"
//             id="signUp-image"
//             style={{ borderRadius: "1rem" }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../components/image.png";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch user data from dashboard route
    axios
      .get("http://localhost:5000/api/notes/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmail(res.data.user.email); // Assuming response = { email: "..." }
      })
      .catch((err) => {
        console.error("Token invalid or error:", err.message);
        localStorage.removeItem("token");
        navigate("/signin");
      });
  }, [navigate]);

  return (
    <>
      <div className="container d-flex flex-wrap" id="signUp-main">
        {/* Left Panel */}
        <div
          className="d-flex flex-column justify-content-center p-4"
          id="signUp-left"
          style={{ flex: 1 }}
        >
          <h2>Dashboard</h2>
          <p className="mt-2">
            Welcome, <strong>{email || "Loading..."}</strong>
          </p>

          <div className="mt-4">
            <button className="btn btn-primary me-2">Create Note</button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Panel: Image */}
        <div
          className="d-none d-md-flex align-items-center justify-content-center"
          id="signUp-right"
        >
          <img
            src={image}
            alt="dashboardImage"
            id="signUp-image"
            style={{ borderRadius: "1rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
