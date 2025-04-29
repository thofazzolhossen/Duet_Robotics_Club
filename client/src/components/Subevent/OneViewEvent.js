import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OneViewEvent = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // Correctly define queryParams
    const eventHeader = queryParams.get("header"); // Extract "header" from query
    const eventname = queryParams.get("eventName"); // Extract "Event" from query

    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);


    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventHeader) {
                setError("No event header provided.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/subevent/viewsubevent");
                const eventData = response.data.find((e) => e.header === eventHeader && e.eventName === eventname); // Find event by header
                const teamresponse = await axios.get("http://localhost:5000/api/advisorforevent/view");
                const teamData = teamresponse.data.filter((e) => e.subevent === eventHeader && e.mainevent === eventname); // Use filter to get all matching team data

                if (teamData.length > 0) {
                    setTeamMembers(teamData); // Store all matching team data
                }
                if (eventData) {
                    setEvent(eventData);
                } else {
                    setError("Event not found.");
                }
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load event.");
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [eventHeader, eventname]);

    if (isLoading) return <p>Loading event details...</p>;
    if (error) return <p>{error}</p>;

    return (

        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>


            <div
                style={{
                    maxWidth: "90%",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    fontFamily: "Arial, sans-serif",
                    backgroundColor: "#fff",
                    textAlign: "center",
                }}

            >
                <h2 style={{ color: "#333", marginBottom: "10px" }}>{event.eventName} <p>{event.header}</p></h2>
                <br></br><br></br><br></br>
                <img
                    src={`http://localhost:5000/Upload/image/subevent/${event.imageOrVideo}`}
                    alt="Event Media"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "600px",
                        borderRadius: "8px",
                        objectFit: "cover",

                    }}
                />
                <br></br><br></br><br></br>
                <h3 style={{ color: "#444", marginBottom: "10px" }}>{event.header}</h3>
                <br></br><br></br><br></br>

                <div className=".container-fluid px-0" style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <div className="row mx-0" style={{ marginLeft: "50px", marginRight: "0px" }}>
                        {/* Left Side: Event Description */}
                        <div className="col-md-6 px-0">
                            <p
                                style={{
                                    textAlign: "justify",
                                    fontSize: "16px",
                                    fontFamily: "'Georgia', 'Times New Roman', serif",
                                    lineHeight: "1.8",
                                    letterSpacing: "0.3px",
                                    color: "#2c3e50",
                                    backgroundColor: "#f8f9fa",
                                    padding: "20px",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    marginBottom: "30px",
                                }}
                            >
                                {event.description1.split("\n").map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>

                        </div>

                        {/* Right Side: Team Members */}
                        <div className="col-md-6">
                            <div class="team" id="team">
                                <div class="container">
                                    <div class="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                                        <p>Our Advisor</p>
                                        <h2>Expert Advisor Members</h2>
                                    </div>

                                    <div className="row">
                                        {teamMembers.map((member, index) => (
                                            <div className="col-md-6" key={member._id || index} style={{ marginBottom: "40px" }}>
                                                <div
                                                    className="shadow-sm d-flex flex-column align-items-center text-center"
                                                    style={{
                                                        backgroundColor: "#ffffff",
                                                        transition: "transform 0.3s",
                                                        minHeight: "300px",
                                                        overflow: "hidden",
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                                >
                                                    <div
                                                        style={{
                                                            width: "120px",
                                                            height: "120px",
                                                            borderRadius: "50%",
                                                            overflow: "hidden",
                                                            marginBottom: "15px",
                                                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                                        }}
                                                    >
                                                        <img
                                                            src={`http://localhost:5000/Upload/image/advisor/${member.image}`}
                                                            alt={member.name}
                                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        />
                                                    </div>
                                                    <h5 className="fw-bold mb-1">{member.name}</h5>
                                                    <h6 className="text-muted mb-2">{member.position}</h6>
                                                    <p style={{ fontSize: "14px", color: "#555" }}>{member.description}</p>

                                                    <div
                                                        className="d-flex justify-content-center flex-wrap gap-2"
                                                        style={{ width: "100%", paddingTop: "10px" }}
                                                    >
                                                        {[
                                                            { icon: "fas fa-envelope", link: `mailto:${member.email}`, bg: "#343a40" },
                                                            { icon: "fab fa-facebook-f", link: member.facebook, bg: "#3b5998" },
                                                            { icon: "fab fa-linkedin-in", link: member.linkedin, bg: "#0e76a8" },
                                                            { icon: "fab fa-whatsapp", link: `https://wa.me/+88${member.whatsapp}`, bg: "#25D366" },
                                                        ].map((item, i) => (
                                                            <a
                                                                key={i}
                                                                href={item.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: "35px",
                                                                    height: "35px",
                                                                    margin: "5px",
                                                                    borderRadius: "50%",
                                                                    backgroundColor: item.bg,
                                                                    color: "#fff",
                                                                    fontSize: "16px",
                                                                    transition: "background-color 0.3s, transform 0.3s",
                                                                    textDecoration: "none",
                                                                }}
                                                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                                                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                                            >
                                                                <i className={item.icon}></i>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>



                            </div>
                        </div>

                    </div>
                </div>

                <br></br><br></br><br></br>
                <img
                    src={`http://localhost:5000/Upload/image/subevent/${event.demoPicture}`}
                    alt="Demo Image"
                    style={{
                        width: "100%",
                        maxHeight: "600px",
                        borderRadius: "8px",
                        objectFit: "cover",
                    }}
                />
                <br></br><br></br><br></br>
                <p style={{
                    textAlign: "left", 
                    fontSize: "16px", 
                    fontFamily: "Georgia, serif", 
                    lineHeight: "1.8",        
                    color: "#2c3e50",
                    backgroundColor: "#f8f9fa", 
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    {event.description2.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
                <br></br><br></br><br></br>
                <div style={{ textAlign: "center" }}>
  <h2 style={{ color: "red", display: "inline-block", position: "relative" }}>
    Registration link
    <span
      style={{
        content: '""',
        display: "block",
        width: "80px",
        height: "3px",
        backgroundColor: "green",
        margin: "4px auto 0",
      }}
    ></span>
  </h2>
</div>


                {event.links && event.links.trim().split(/\s+/).map((link, index) => (
    <a
        key={index}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: "inline-block",
            margin: "8px 10px 8px 0",
            padding: "10px 16px",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#007bff",
            borderRadius: "6px",
            textDecoration: "none",
            wordWrap: "break-word",
            maxWidth: "100%",
            boxSizing: "border-box"
        }}
    >
        {link}
    </a>
))}

            </div>
        </div>
    );
};

export default OneViewEvent;
