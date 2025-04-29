import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdvertisementForm = () => {
  const [hover, setHover] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/api/advertisement/add", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        navigate("/admin");
      }
    } catch (err) {
      setError("Failed to add advertisement. Please try again.");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center wow fadeInUp"
      data-wow-delay="0.1s"
      style={{
        backgroundColor: "#f0f8ff",
        marginBottom: "100px",
        height: "auto",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <div
        className="text-center mb-4 py-4"
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <div className="d-flex align-items-center justify-content-between p-3">
          <button className="btn btn-primary">
            <Link to={"/admin"} className="fa fa-arrow-left"></Link>
          </button>
          <h1 className="fw-bold mx-auto">Add Advertisement</h1>
        </div>
        <p className="text-muted">Please fill out all fields</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="card shadow-lg p-4 py-5"
        style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="control-group">
            <h6 style={{ color: "white" }}>Name :</h6>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Advertisement Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="control-group mt-3">
            <h6 style={{ color: "white" }}>Image :</h6>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn"
              type="submit"
              style={{
                color: hover ? "black" : "#0a9396",
                backgroundColor: hover ? "#0a9396" : "#ffffff",
                border: "2px solid #0a9396",
                boxShadow: "inset 0 0 0 50px #ffffff",
                transition: "background-color 0.3s, color 0.3s, border 0.3s",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertisementForm;
