import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddAllEventForm = () => {
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
        width: "100%",
      }} 
    >
       <div
        className="text-center mb-4 py-4"
        style={{ marginTop: "50px", marginBottom: "100px",  }}
      >
        <div className="d-flex align-items-center justify-content-between p-3">
          <button className="btn btn-primary" style={{marginRight: "25px"}}>
          <Link to={"/admin"} className="fa fa-arrow-left"></Link>
          </button>
          <h1 className="fw-bold mx-auto">Add Head Event Using This Form</h1>
        </div>
        <p className="text-muted">Please Fill all field of form</p>
      </div>

      <div
        className="card shadow-lg p-4 py-5"
        style={{ width: "100%", maxWidth: "80%", background: "#0a9396" }}
      >
        <div class="contact-form">
          <div id="success"></div>
          <form name="sentMessage" id="contactForm" novalidate="novalidate" >

          <h2 style={{ color: "white", textAlign:"center" }}>Event Details</h2>

            <div class="control-group">
              <h6 style={{ color: "white" }}>Event Title :</h6>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Event Title only 1 line"
                
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
                
            
                required
              />
            </div>
            <hr style={{background:"white"}}></hr>

            {/*     */}

            <div class="control-group">
              <h6 style={{ color: "white" }}>Description 1 :</h6>
              <textarea
                type="text"
                class="form-control"
                id="description1"
                placeholder="Your Description1"
                
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
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAllEventForm;
