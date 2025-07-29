import React, { useRef, useEffect, useState } from "react";
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
  const [description, setDescription] = useState("");
  const ref = useRef(null);
  const refClose = useRef(null);
  const AddClick = () => {
    ref.current.click();
  };
  const handleClick = async (e) => {
    refClose.current.click();
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/notes/add",
        {
          description, // or use variable: description
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.message === "Note added successfully") {
        setNotes((prevNotes) => [...prevNotes, res.data.note]);
        setDescription("");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/notes/fetch", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setNotes(res.data.notes);
      }
    } catch (error) {
      alert("Failed to fetch notes");
      console.error(error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the note from state without re-fetching
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      alert("Failed to delete note");
      console.error(error);
    }
  };
  return (
    <>
      <div className="container d-flex flex-wrap" id="signUp-main">
        {/* Left Panel */}
        <div
          className="d-flex flex-column  p-4"
          id="signUp-left"
          style={{ flex: 1 }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <h4>Dashboard</h4>
            <button
              className="btn btn-link"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }}
            >
              Sign Out
            </button>
          </div>
          <div
            className="d-flex flex-column shadow-lg rounded-3 align-items-center justify-content-center"
            style={{
              height: "20%",
              width: "100%",
              marginTop: "3rem",
            }}
          >
            <h5> Welcome</h5>
            <p>
              <strong>{email || "Loading..."}</strong>
            </p>
          </div>

          <div className="mt-4">
            <button className="btn btn-primary me-2 w-100" onClick={AddClick}>
              Create Note
            </button>
          </div>
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            ref={ref}
          >
            Launch demo modal
          </button>

          <div
            className="modal fade"
            id="exampleModal1"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add New Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="my-2" id="jobForm" onSubmit={handleClick}>
                    <div className="mb-2">
                      <label htmlFor="tag" className="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    form="jobForm"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <h3>Notes</h3>
            <div className="">
              {notes.map((note) => (
                <div key={note._id} className="">
                  <div className="card shadow-sm my-1 ">
                    <div className="d-flex align-items-center justify-content-between ">
                      <p className="card-text my-1 mx-1">{note.description}</p>
                      <button
                        className="btn"
                        onClick={() => handleDelete(note._id)}
                      >
                        <i className="fa-solid fa-trash-can text-danger"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
