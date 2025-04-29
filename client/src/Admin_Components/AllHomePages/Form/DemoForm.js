import React, { useState } from "react";

const Demoform = () => {
  const [hover, setHover] = useState(false);
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
        <h1 className="fw-bold">Form Page</h1>
        <p className="text-muted">Your form is here</p>
      </div>


      <div
        className="card shadow-lg p-4 py-5"
        style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
      >
        <div class="contact-form">
          <div id="success"></div>
          <form name="sentMessage" id="contactForm" novalidate="novalidate">
            <div class="control-group">
              <h6 style={{ color: "white" }}>Name :</h6>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Your Name"
                required="required"
                data-validation-required-message="Please enter your name"
              />
              <p class="help-block"></p>
            </div>

            <div class="control-group">
              <h6 style={{ color: "white" }}>Email :</h6>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Your Email"
                required="required"
                data-validation-required-message="Please enter your email"
              />
              <p class="help-block"></p>
            </div>
            <div class="control-group">
              <h6 style={{ color: "white" }}>Subject :</h6>
              <input
                type="text"
                class="form-control"
                id="subject"
                placeholder="Subject"
                required="required"
                data-validation-required-message="Please enter a subject"
              />
              <p class="help-block"></p>
            </div>
            <div class="control-group">
              <h6 style={{ color: "white" }}>Message :</h6>
              <textarea
                class="form-control"
                id="message"
                placeholder="Message"
                required="required"
                data-validation-required-message="Please enter your message"
              ></textarea>
              <p class="help-block"></p>
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
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Demoform;
