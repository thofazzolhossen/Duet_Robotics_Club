import React from 'react'
import img from '../../img/drclogo.png'

const Navbar = () => {
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
        <a href='/'>  <img src={img} style={{width: "70px" , height: "70px", marginLeft: "30px"}} alt='imagee'/></a>
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
              <a href="/" className="nav-item nav-link active">Home</a>
              <a href="/about" className="nav-item nav-link">About</a>
              <a href="/team" className="nav-item nav-link">Team</a>
              <a href="/service" className="nav-item nav-link">Service</a>
              <a href="/achivement" className="nav-item nav-link">Achivement</a>
  
              <a href="/event" className="nav-item nav-link">Event</a>
              <a href="/contact" className="nav-item nav-link">Contact</a>
              <form class="search-box">
                <input type="text" placeholder="Search..." aria-label="Search" />
                <button type="submit"><i class="fas fa-search"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
