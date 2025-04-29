import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/about/getAllAbout");
                setTeamMembers(response.data); // Assuming the data is an array of team members

            } catch (err) {
                setError("Failed to load team members.");


            }
        };

        fetchTeamMembers();
    }, []);



    return (
        <div>
            <div className="about wow fadeInUp" data-wow-delay="0.1s" id="about" style={{marginTop: "40px"}}>
                <div className="container-fluid">
              
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-img">
                                <img src = {`http://localhost:5000/Upload/image/about/${teamMembers[0]?.image}`} alt={teamMembers[0]?.image} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-header text-left">
                                    <p>Learn About DUET Robotics Club</p>
                                    <h2>{teamMembers[0]?.title}</h2>
                                </div>
                                <div className="about-text">
                                    <p className="wow fadeInRight" data-wow-delay="0.4s">
                                    {teamMembers[0]?.description1}
                                    </p>
                                    <hr style={{ backgroundColor: "#0a9396" }}></hr>
                                    <br></br>
                                    <p className="wow fadeInRight" data-wow-delay="0.7s">
                                    {teamMembers[0]?.description2}
                                    </p>


                                </div>

                                <a className="btn" href="https://www.facebook.com/duet.robotics.club">Learn More</a>
                            </div>
                        </div>
                    </div>
            

                </div>
            </div>
        </div>
    )
    
}

export default About