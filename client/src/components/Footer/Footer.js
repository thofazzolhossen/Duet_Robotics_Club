import React, { useEffect, useState } from "react";
import axios from "axios";


const Footer = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState(null);


useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/footer/viewfooter");
        setTeamMembers(response.data); // Assuming the data is an array of team members
        
      } catch (err) {
        setError("Failed to load team members.");
        
        
      }
    };

    fetchTeamMembers();
  }, []);



  return (
    <div>
        <div class="footer wow fadeIn" data-wow-delay="0.3s">
            <div class="container-fluid">
                <div class="container">
                    <div class="footer-info">
                        <h2>{teamMembers[0]?.title}</h2>
                        <h3>{teamMembers[0]?.address}</h3>
                        <div class="footer-menu">
                            <p>{teamMembers[0]?.number}</p>
                            <p>{teamMembers[0]?.email}</p>
                        </div>
                        <div class="footer-social">
                            <a href={teamMembers[0]?.twitar}><i class="fab fa-twitter"></i></a>
                            <a href={teamMembers[0]?.facebook}><i class="fab fa-facebook-f"></i></a>
                            <a href={teamMembers[0]?.youtube}><i class="fab fa-youtube"></i></a>
                            <a href={teamMembers[0]?.instagram}><i class="fab fa-instagram"></i></a>
                            <a href={teamMembers[0]?.linkedin}><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div class="container copyright">
                    <p>&copy; <a href="https://www.facebook.com/duet.robotics.club">DUET Robotics Club</a>, All Right Reserved | Designed and Developed By <a href="https://www.linkedin.com/in/thofazzol-hossen-872a2923a/">Thofazzol Hossen</a> and <a href="https://www.linkedin.com/in/salah-uddin-552b4a16b/"> Salah Uddin</a> </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer