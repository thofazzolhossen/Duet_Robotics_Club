
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Services = () => {
      const [event, setEvent] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);



      useEffect(() => {
        const fetchEvent = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/service/viewserviceRouter");
            setEvent(response.data); // Assuming the data is an array of team members
            setIsLoading(false);
          } catch (err) {
            setError("Failed to load service.");
            setIsLoading(false);
          }
        };
    
        fetchEvent();
      }, []);





  return (
    <div>
         <div className="service" id="service">
            <div className="container">
                <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                    <p>What I do</p>
                    <h2>Awesome Quality Services</h2>
                </div>
                <div className="row">
                    

                {event.map((item,index) => (
                    
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.0s">
                    <div className="service-item">
                        <div className="service-icon">
                            <i className={item.icon}></i>
                        </div>
                        <div className="service-text">
                            <h3>{item.title}</h3>
                            <p>
                                {item.description}
                            </p>
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

export default Services