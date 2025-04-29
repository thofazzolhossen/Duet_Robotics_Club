import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';


export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/api/admin/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.data) {
                setMessage(response.data.message);
                toast.success(response.data.message, {position: "top-right"});
                onLogin(); // Notify App that login succeeded
            }else{
              toast.success(response.data.message, {position: "top-right"});
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
            <h1 className="fw-bold mx-auto">Admin Login</h1>
          </div>
          
        </div>
  
        
  
        <div
          className="card shadow-lg p-4 py-5"
          style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
        >
            

          <div class="contact-form">
            <div id="success"></div>
            <form onSubmit={handleLogin} novalidate="novalidate">
  
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
                  placeholder="Enter Password"
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};
