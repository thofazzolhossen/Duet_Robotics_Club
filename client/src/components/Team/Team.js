import React, { useEffect, useState } from "react";
import axios from "axios";



const Team = () => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/team/view");
        setTeamMembers(response.data); // Assuming the data is an array of team members

      } catch (err) {
        setError("Failed to load team members.");


      }
    };

    fetchTeamMembers();
  }, []);


  return (
    <div>
      <div class="team" id="team">
        <div class="container">
          <div class="section-header text-center wow zoomIn" data-wow-delay="0.1s">
            <p>My Team</p>
            <h2>Expert Team Members</h2>
          </div>
          <div class="row">
            {teamMembers.map((member, index) => (
              <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" key={index._id}>
                <div class="team-item">
                  <div class="team-img" style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}>
                    <img src={`http://localhost:5000/Upload/image/team/${member.image}`} alt={member.image} style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}  />
                  </div>
                  <div class="team-text">
                    <h2 className="wow fadeInRight" data-wow-delay="0.1s">{member.name}</h2>
                    <h4 className="wow fadeInRight" data-wow-delay="0.2s">{member.position}</h4>
                    <p className="wow fadeInRight" data-wow-delay="0.3s">
                      {member.description}
                    </p>
                    <div class="team-social">
                      <a className="btn wow fadeInUp" data-wow-delay="0.1s" href={member.email}><i href={member.email} class="fas fa-envelope"></i></a>
                      <a className="btn wow fadeInUp" data-wow-delay="0.2s" href={member.facebook}><i href={member.facebook} class="fab fa-facebook-f"></i></a>
                      <a className="btn wow fadeInUp" data-wow-delay="0.3s" href={member.linkedin}><i href={member.linkedin} class="fab fa-linkedin-in"></i></a>
                      <a className="btn wow fadeInUp" data-wow-delay="0.4s" href={`https://wa.me/+88${member.whatsapp}`}><i href={`https://wa.me/+88${member.whatsapp}`} class="fab fa-whatsapp"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team