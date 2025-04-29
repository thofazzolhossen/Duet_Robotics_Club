import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SubEventForm = () => {
    const [hover, setHover] = useState(false);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        eventName: "",
        imageOrVideo: null,
        header: "",
        description1: "",
        demoPicture: null,
        description2: "",
        links: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/event/viewevent");
                setEvents(response.data);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load events.");
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("eventName", formData.eventName);
        data.append("header", formData.header);
        data.append("description1", formData.description1);
        data.append("description2", formData.description2);
        data.append("links", formData.links);
    
        if (formData.imageOrVideo) {
            data.append("imageOrVideo", formData.imageOrVideo);
        }
        if (formData.demoPicture) {
            data.append("demoPicture", formData.demoPicture);
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/subevent/addsubevent", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            
            setFormData({
                eventName: "",
                imageOrVideo: null,
                header: "",
                description1: "",
                demoPicture: null,
                description2: "",
                links: "",
            });

            if (response.status === 201) {
                window.location.href = "/admin";
            }
            


        } catch (error) {
            console.error("Error adding sub-event:", error.response?.data || error);
            alert("Failed to add sub-event.");
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
                width: "100%",
            }}
        >
            <div className="text-center mb-4 py-4" style={{ marginTop: "50px", marginBottom: "100px" }}>
                <div className="d-flex align-items-center justify-content-between p-3">
                    <button className="btn btn-primary" style={{ marginRight: "25px" }}>
                        <Link to="/admin" className="fa fa-arrow-left"></Link>
                    </button>
                    <h1 className="fw-bold mx-auto">Add Sub Event Using This Form</h1>
                </div>
                <p className="text-muted">Please fill all fields of the form</p>
            </div>

            <div className="card shadow-lg p-4 py-5" style={{ width: "100%", maxWidth: "80%", background: "#0a9396" }}>
                <div className="contact-form">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2 style={{ color: "white", textAlign: "center" }}>Sub Event Details</h2>

                        {/* Event Name Dropdown */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Event Name :</h6>
                            <select
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                                style={{ width: "100%", height: "40px" }}
                                required
                            >
                                <option value="">Select an Event</option>
                                {events.map((event, index) => (
                                    <option key={index} value={event.title}>
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image or Video Upload */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Image or Video :</h6>
                            <input
                                type="file"
                                className="form-control"
                                name="imageOrVideo"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        {/* Header */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Sub Event Name :</h6>
                            <input
                                type="text"
                                className="form-control"
                                name="header"
                                placeholder="Sub Event Title or Name (max 1 line)"
                                value={formData.header}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Event Description 1 */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Event Description 1 :</h6>
                            <textarea
                                className="form-control"
                                name="description1"
                                placeholder="Your Description 1"
                                value={formData.description1}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Demo Picture Upload */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Demo Picture :</h6>
                            <input
                                type="file"
                                className="form-control"
                                name="demoPicture"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Event Description 2 */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Event Description 2 :</h6>
                            <textarea
                                className="form-control"
                                name="description2"
                                placeholder="Your Description 2"
                                value={formData.description2}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Links */}
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Links :</h6>
                            <textarea
                                className="form-control"
                                name="links"
                                placeholder="All Links"
                                value={formData.links}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <hr style={{ background: "white" }} />

                        {/* Submit Button */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button
                                className="btn"
                                type="submit"
                                style={{
                                    marginTop: "35px",
                                    color: hover ? "Black" : "#0a9396",
                                    backgroundColor: hover ? "#0a9396" : "#ffffff",
                                    border: "2px solid #0a9396",
                                    boxShadow: "inset 0 0 0 50px #ffffff",
                                    transition: "background-color 0.3s, color 0.3s, border 0.3s",
                                }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
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

export default SubEventForm;
