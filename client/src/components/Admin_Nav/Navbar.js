import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import img from '../../img/drclogo.png'

const AdminNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if cookie exists by making a backend call
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/admin/protected", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setTimeout(() => {
          
        }, 800); // Delay for 1 second
      }
    };

    checkAuth();
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/logout', {}, { withCredentials: true });
      toast.success("Logout successfully", { position: "top-right" });

      // Redirect after a delay to ensure toast is displayed
      setTimeout(() => {
          window.location.href = '/admin'; // Redirect after logout
      }, 3000); // Wait for 2 seconds to allow the toast to show
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <>
      <div 
        className="navbar navbar-expand-lg navbar-light" 
        style={{ padding: 0, margin: 0, width: "100%", maxHeight: "80px" }}
      >
        <div 
          className="container-fluid" 
          style={{ width: "100%", padding: "20px" }}
        >
          <img src={img} style={{width: "100px" , height: "100px", marginLeft: "30px"}} alt='imagee'/>
          <button 
            type="button" 
            className="navbar-toggler" 
            data-toggle="collapse" 
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div 
            className="collapse navbar-collapse justify-content-between" 
            id="navbarCollapse" 
            
          >
            <div className="navbar-nav ml-auto">
              <a href="adminDRC" className="nav-item nav-link active">Header</a>
              <a href="adminDRC" className="nav-item nav-link">Team</a>
              <a href="adminDRC" className="nav-item nav-link">Achivement</a>
              <a href="adminDRC" className="nav-item nav-link">Certificate</a>
              <a href="adminDRC" className="nav-item nav-link">Event</a>
  
              <a href="adminDRC" className="nav-item nav-link">Counter</a>
              <a href="adminDRC" className="nav-item nav-link">About</a>
              <a href="adminDRC" className="nav-item nav-link">Testimonial</a>
              <a href="adminDRC" className="nav-item nav-link">Services</a>
              <a href="adminDRC" className="nav-item nav-link">Footer</a>
              <a href="adminDRC" className="nav-item nav-link">Slider</a>
              {isAuthenticated ? (
                <>
                  <a href="adminDRC" onClick={handleLogout} className="nav-item nav-link" style={{color:"black"}}>Logout</a>
                  <a href="/admin/changepassword" className="nav-item nav-link" style={{color:"black"}}>Change Pass</a>
                </>
              ) : (
                <a href="adminDRC" className="nav-item nav-link" style={{color:"yellow"}}>Login</a>
              )}
              
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminNavbar
