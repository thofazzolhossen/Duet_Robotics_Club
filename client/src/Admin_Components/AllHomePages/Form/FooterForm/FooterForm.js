import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FooterForm = () => {
  const [hover, setHover] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        number: "",
        email: "",
        twitar: "",
        facebook: "",
        youtube: "",
        instagram: "",
        linkedin: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };

    


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const form = new FormData();
      form.append("title", formData.title);
      form.append("address", formData.address);

      form.append("number", formData.number);
      form.append("email", formData.email);

      form.append("twitar", formData.twitar);
      form.append("facebook", formData.facebook);
      form.append("youtube", formData.youtube);
      form.append("instagram", formData.instagram);
      form.append("linkedin", formData.linkedin);


      if (!formData.title || !formData.address || !formData.youtube || !formData.linkedin || !formData.instagram ||  !formData.number || !formData.email || !formData.twitar || !formData.facebook) {
        setError("All fields are required.");
        return;
      }

  
      try {
        const response = await axios.post("http://localhost:5000/api/footer/addfooter", { ...formData },
            { headers: { "Content-Type": "application/json" } });
        if (response.status === 201) {
          navigate("/admin");
        }
      } catch (err) {
        setError("Failed to add countdown. Please try again.");
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
      }} // Light background color
    >
      <div
        className="text-center mb-4 py-4"
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <div className="d-flex align-items-center justify-content-between p-3">
          <button className="btn btn-primary">
          <Link to={"/admin"} className="fa fa-arrow-left"></Link>
          </button>
          <h1 className="fw-bold mx-auto">Add Footer</h1>
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
          <form onSubmit={handleSubmit} novalidate="novalidate">

            <div class="control-group">
              <h6 style={{ color: "white" }}>Title :</h6>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter Your Title"
                value={formData.title}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Address :</h6>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>


            <div class="control-group">
              <h6 style={{ color: "white" }}>Number :</h6>
              <input
                type="text"
                class="form-control"
                id="number"
                placeholder="Enter Your Number"
                value={formData.number}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your number"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Email :</h6>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>



            <div class="control-group">
              <h6 style={{ color: "white" }}>Twitar :</h6>
              <input
                type="text"
                class="form-control"
                id="twitar"
                placeholder="Enter Your Twitar"
                value={formData.twitar}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your twitar"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Facebook :</h6>
              <input
                type="text"
                className="form-control"
                id="facebook"
                placeholder="Enter facebook"
                value={formData.facebook}
                onChange={handleChange}
                required
              />
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Youtube :</h6>
              <input
                type="text"
                className="form-control"
                id="youtube"
                placeholder="Enter youtube"
                value={formData.youtube}
                onChange={handleChange}
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Instagram :</h6>
              <input
                type="text"
                className="form-control"
                id="instagram"
                placeholder="Enter instagram"
                value={formData.instagram}
                onChange={handleChange}
                required
              />
            </div>
            <div className="control-group">
              <h6 style={{ color: "white" }}>Linkedin :</h6>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                placeholder="Enter linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                required
              />
            </div>



            


            
            
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FooterForm;

