import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddEventForm = () => {
  
  const [hover, setHover] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    description1: "",
    description2: "",
    description3: "",
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
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("description1", formData.description1);
    form.append("description2", formData.description2);
    form.append("description3", formData.description3);
    form.append("image", image); // Add the image file

    try {
      const response = await axios.post("http://localhost:5000/api/event/addevent", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) {
        navigate("/admin");
      }
    } catch (err) {
      setError("Failed to add team member. Please try again.");
      console.log(err);
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
          <button className="btn btn-primary" style={{marginRight: "25px"}}>
          <Link to={"/admin"} className="fa fa-arrow-left"></Link>
          </button>
          <h1 className="fw-bold mx-auto">Add Event</h1>
        </div>
        <p className="text-muted">Please Fill all field of form</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}


      <div
        className="card shadow-lg p-4 py-5"
        style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
      >
        <div class="contact-form">
          <div id="success"></div>
          <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={handleSubmit}>
            <div class="control-group">
              <h6 style={{ color: "white" }}>Event Title :</h6>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Event Title only 1 line"
                value={formData.title}
                onChange={handleChange}
                required
                data-validation-required-message="Please enter your event title"
              />
              <p class="help-block"></p>
            </div>

            <div class="control-group">
              <h6 style={{ color: "white" }}>Event Description :</h6>
              <textarea
                type="text"
                class="form-control"
                id="description"
                placeholder="Your Description with 4 line"
                value={formData.description}
                onChange={handleChange}
                required
                data-validation-required-message="Please enter your description"
              />
              <p class="help-block"></p>
            </div>
            

            <div className="control-group">
              <h6 style={{ color: "white"}}>Event Image :</h6>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
            
                required
              />
            </div>


            <div class="control-group">
              <h6 style={{ color: "white" }}>Description 1 :</h6>
              <textarea
                type="text"
                class="form-control"
                id="description1"
                placeholder="Your Description1"
                value={formData.description1}
                onChange={handleChange}
                required
                data-validation-required-message="Please enter your description1"
              />
              <p class="help-block"></p>
            </div>

            <div class="control-group">
              <h6 style={{ color: "white" }}>Description 2 :</h6>
              <textarea
                type="text"
                class="form-control"
                id="description2"
                placeholder="Your Description2"
                value={formData.description2}
                onChange={handleChange}
                required
                data-validation-required-message="Please enter your description2"
              />
              <p class="help-block"></p>
            </div>

            <div class="control-group">
              <h6 style={{ color: "white" }}>Description 3 :</h6>
              <textarea
                type="text"
                class="form-control"
                id="description3"
                placeholder="Your Description3"
                value={formData.description3}
                onChange={handleChange}
                required
                data-validation-required-message="Please enter your description3"
              />
              <p class="help-block"></p>
            </div>
            <hr style={{background:"white"}}></hr>
            
            
            
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                class="btn"
                type="submit"
                id="sendMessageButton"
                style={{
                  marginTop: "35px",
                  color: hover ? "Black" : "#0a9396",
                  backgroundColor: hover ? "#0a9396" : "#ffffff", // White background when not hovered
                  border: "2px solid #0a9396", // Red border to match the text color
                  boxShadow: "inset 0 0 0 50px #ffffff",
                  transition: "background-color 0.3s, color 0.3s, border 0.3s", // Smooth transition
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add Event           
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
