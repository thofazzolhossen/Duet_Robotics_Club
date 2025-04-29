import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const UpdatePass = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                'http://localhost:5000/api/admin/update',
                { email, password },
                { withCredentials: true }
            );


            
            if (response.data) {
                setMessage(response.data.message);
                await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });
                toast.success(response.data.message, { position: "top-right" });
                
                      // Redirect after a delay to ensure toast is displayed
                      setTimeout(() => {
                        window.location.href = '/adminDRC';
                      }, 400); // Wait for 2 seconds to allow the toast to show
               
            }

        } catch (error) {
            console.log(error);
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
            <h1 className="fw-bold mx-auto">Admin Password Change</h1>
          </div>
          
        </div>
  
        
  
        <div
          className="card shadow-lg p-4 py-5"
          style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
        >
            

          <div class="contact-form">
            <div id="success"></div>
            <form onSubmit={handleUpdate} novalidate="novalidate">
  
              <div class="control-group">
                <h6 style={{ color: "white" }}>Email :</h6>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                  required="required"
                  
                />
                <p class="help-block"></p>
              </div>
  
              <div className="control-group">
                <h6 style={{ color: "white" }}>Password :</h6>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  placeholder="Enter New Password"
                      value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  
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
                    color:  "Black",
                    backgroundColor:  "#ffffff", // White background when not hovered
                    border: "2px solid #0a9396", // Red border to match the text color
                    boxShadow: "inset 0 0 0 50px #ffffff",
                    transition: "background-color 0.3s, color 0.3s, border 0.3s", // Smooth transition
                  }}
                  
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};
