import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Countdown = () => {
  const [hover, setHover] = useState(false);
    const [formData, setFormData] = useState({
      title1: "",
      value1: "",
      title2: "",
      value2: "",
      title3: "",
      value3: "",
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
      form.append("title1", formData.title1);
      form.append("value1", formData.value1);

      form.append("title2", formData.title2);
      form.append("value2", formData.value2);

      form.append("title3", formData.title3);
      form.append("value3", formData.value3);


      if (!formData.title1 || !formData.value1 || !formData.title2 || !formData.value2 || !formData.title3 || !formData.value3) {
        setError("All fields are required.");
        return;
      }

  
      try {
        const response = await axios.post("http://localhost:5000/api/countdown/addcountdown", { ...formData },
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
          <h1 className="fw-bold mx-auto">Add Countdown</h1>
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
              <h6 style={{ color: "white" }}>Title 1 :</h6>
              <input
                type="text"
                class="form-control"
                id="title1"
                placeholder="Enter Your Title"
                value={formData.title1}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>value 1 :</h6>
              <input
                type="text"
                className="form-control"
                id="value1"
                placeholder="Enter value"
                value={formData.value1}
                onChange={handleChange}
                required
              />
            </div>


            <div class="control-group">
              <h6 style={{ color: "white" }}>Title 2 :</h6>
              <input
                type="text"
                class="form-control"
                id="title2"
                placeholder="Enter Your Title"
                value={formData.title2}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>value 2 :</h6>
              <input
                type="text"
                className="form-control"
                id="value2"
                placeholder="Enter value"
                value={formData.value2}
                onChange={handleChange}
                required
              />
            </div>



            <div class="control-group">
              <h6 style={{ color: "white" }}>Title 3 :</h6>
              <input
                type="text"
                class="form-control"
                id="title3"
                placeholder="Enter Your Title"
                value={formData.title3}
                onChange={handleChange}
                required="required"
                data-validation-required-message="Please enter your title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>value 3 :</h6>
              <input
                type="text"
                className="form-control"
                id="value3"
                placeholder="Enter value"
                value={formData.value3}
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

export default Countdown;

