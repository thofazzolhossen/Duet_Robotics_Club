import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Editachiveform = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/achive/getAllAchive/${id}`);
                setTeamMembers(response.data); // Assuming the data is an array of team members
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load team members.");
                setIsLoading(false);
            }
        };

        fetchTeamMembers();
    }, []);




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
          <h1 className="fw-bold mx-auto">Add Your Achive</h1>
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
          <form novalidate="novalidate" >
            <div class="control-group">
              <h6 style={{ color: "white" }}>Title :</h6>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Title with 15 Char"
                
                required="required"
                data-validation-required-message="Please enter your title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Image :</h6>
              <input
                type="file"
                className="form-control"
                id="image"
                
                
                required
              />
            </div>


            <div class="control-group">
              <h6 style={{ color: "white" }}>Main Title :</h6>
              <input
                type="text"
                class="form-control"
                id="maintitle"
                placeholder="Main Title"
                required="required"
                
                data-validation-required-message="Please enter your main title"
              />
              <p class="help-block"></p>
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Description-1 :</h6>
              <input
                type="text"
                className="form-control"
                id="description1"
                              
                placeholder="Description here..."
                required
              />
            </div>

            <div className="control-group">
              <h6 style={{ color: "white" }}>Description-2 :</h6>
              <input
                type="text"
                className="form-control"
                id="description2"
                             
                placeholder="Description here..."
                required
              />
            </div>


            <div className="control-group">
              <h6 style={{ color: "white" }}>Description-3 :</h6>
              <input
                type="text"
                className="form-control"
                id="description3"
                               
                placeholder="Description here..."
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
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editachiveform;

