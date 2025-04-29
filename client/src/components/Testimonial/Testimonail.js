import React, { useEffect, useState } from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Testimonail = () => {

const [teamMembers, setTeamMembers] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/testimonial/view");
      setTeamMembers(response.data); // Assuming the data is an array of team members
      
    } catch (err) {
      setError("Failed to load team members.");
      
      
    }
  };

  fetchTeamMembers();
}, []);

  const options = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2000,
    dots: false,
    dotsEach: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
    
  };

  return (
    <div className="testimonial wow fadeInUp" data-wow-delay="0.1s" id="review">
      <div className="container">
        <div className="testimonial-icon">
        <i className="fa fa-quote-left"></i>
        </div>
        <OwlCarousel className="owl-carousel testimonials-carousel" {...options}>
          {/* Testimonial Item 1 */}
          {teamMembers.map((member,index) => (
          <div className="testimonial-item" key={index._id}>
            <div className="testimonial-img">
              <img src={`http://localhost:5000/Upload/image/testimonial/${member.image}`} alt="Customer 1" 
                style={{width:"120px", height: "120px"}}
              />
            </div>
            <div className="testimonial-text">
              <p>
                {member.description}
              </p>
              <h3>{member.name}</h3>
              <h4>{member.position}</h4>
            </div>
          </div>
          ))} 
          

        </OwlCarousel>
      </div>
    </div>
  );
};

export default Testimonail;
