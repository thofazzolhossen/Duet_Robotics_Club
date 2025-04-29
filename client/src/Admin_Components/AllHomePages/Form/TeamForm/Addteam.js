import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Addteam = () => {
  const [hover, setHover] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    description: "",
    facebook: "",
    email: "",
    linkedin: "",
    whatsapp: "",
  });
  const [image, setImage] = useState(null); // Separate state for the image file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file in the image state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("position", formData.position);
    form.append("description", formData.description);
    form.append("facebook", formData.facebook);
    form.append("email", formData.email);
    form.append("linkedin", formData.linkedin);
    form.append("whatsapp", formData.whatsapp);
    form.append("image", image); // Add the image file

    try {
      const response = await axios.post("http://localhost:5000/api/team/add", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        toast.success(response.data.message, {position: "top-right"});
        navigate("/admin");
      }
    } catch (err) {
      setError("Failed to add team member. Please try again.");
      
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center wow fadeInUp"
      data-wow-delay="0.1s"
      id="contact"
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
          <h1 className="fw-bold mx-auto">Add Your Team</h1>
        </div>
        <p className="text-muted">
          You can add members, remove members or modify here
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div
        className="card shadow-lg p-4 py-5"
        style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
      >
        <div className="contact-form">
          <div id="success"></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Name :</h6>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Members Name within 18 characters"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Position :</h6>
              <input
                type="text"
                className="form-control"
                id="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Members Position within 18 characters"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Description :</h6>
              <input
                type="text"
                className="form-control"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description within 65 characters"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Image (300*300) :</h6>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Facebook :</h6>
              <input
                type="url"
                className="form-control"
                id="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook Link"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Email :</h6>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>LinkedIn :</h6>
              <input
                type="url"
                className="form-control"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Your LinkedIn"
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>WhatsApp :</h6>
              <input
                type="number"
                className="form-control"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Your WhatsApp"
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <button
                className="btn"
                type="submit"
                id="sendMessageButton"
                style={{
                  marginTop: "35px",
                  color: hover ? "Black" : "#0a9396",
                  backgroundColor: hover ? "#0a9396" : "#ffffff",
                  border: "2px solid #0a9396",
                  boxShadow: "inset 0 0 0 50px #ffffff",
                  transition: "background-color 0.3s, color 0.3s, border 0.3s",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addteam;
