import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Addadvisor = () => {
    const [hover, setHover] = useState(false);
    const [events, setEvents] = useState([]);
    const [subevents, setSubEvents] = useState([]);
    const [formData, setFormData] = useState({
        mainevent: "",
        subevent: "",
        name: "",
        position: "",
        description: "",
        facebook: "",
        email: "",
        linkedin: "",
        whatsapp: "",
    });
    const [image, setImage] = useState(null); // Separate state for the image file
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /*
        useEffect(() => {
        const fetchSubEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/event/viewsubevent");
                setSubEvents(response.data);
                
            } catch (err) {
                
            }
        };

        fetchSubEvents();
    }, []);
    */


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/event/viewevent");
                setEvents(response.data);

                const response2 = await axios.get("http://localhost:5000/api/subevent/viewsubevent");
                setSubEvents(response2.data);

            } catch (err) {
                setError("Failed to load events.");

            }
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target; // Change from 'id' to 'name'
        setFormData({ ...formData, [name]: value });
    };





    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the file in the image state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("mainevent", formData.mainevent);
        form.append("subevent", formData.subevent);
        form.append("name", formData.name);
        form.append("position", formData.position);
        form.append("description", formData.description);
        form.append("facebook", formData.facebook);
        form.append("email", formData.email);
        form.append("linkedin", formData.linkedin);
        form.append("whatsapp", formData.whatsapp);
        form.append("image", image); // Add the image file
        console.log(form);

        try {
            const response = await axios.post("http://localhost:5000/api/advisorforevent/add", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                toast.success(response.data.message, { position: "top-right" });
                navigate("/admin");
            }
        } catch (err) {
            setError("Failed to add team member. Please try again.");

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
            }}
        >
            <div
                className="text-center mb-4 py-4"
                style={{ marginTop: "50px", marginBottom: "100px" }}
            >
                <div className="d-flex align-items-center justify-content-between p-3">
                    <button className="btn btn-primary">
                        <Link to={"/admin"} className="fa fa-arrow-left"></Link>
                    </button>
                    <h1 className="fw-bold mx-auto">Add Your Advisor</h1>
                </div>
                <p className="text-muted">
                    You can add Advisor, remove Advisor or modify here
                </p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div
                className="card shadow-lg p-4 py-5"
                style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
            >
                <div className="contact-form">
                    <div id="success"></div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Event Name :</h6>
                            <select
                                name="mainevent"
                                value={formData.mainevent}
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

                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Sub Event Name :</h6>
                            <select
                                name="subevent"
                                value={formData.subevent}
                                onChange={handleChange}
                                style={{ width: "100%", height: "40px" }}
                                required
                            >
                                <option value="">Select a Sub Event</option>
                                {subevents
                                    .filter((sub) => sub.eventName === formData.mainevent) // ✅ Filter by selected main event
                                    .map((event, index) => (
                                        <option key={index} value={event.header}>
                                            {event.header}
                                        </option>
                                    ))}
                            </select>
                        </div>


                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Name :</h6>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Members Name within 18 characters"
                                required
                            />
                        </div>
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Position :</h6>
                            <input
                                type="text"
                                className="form-control"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="Members Position within 18 characters"
                                required
                            />
                        </div>

                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Image (300*300) :</h6>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Facebook :</h6>
                            <input
                                type="url"
                                className="form-control"
                                name="facebook"
                                value={formData.facebook}
                                onChange={handleChange}
                                placeholder="Facebook Link"
                                required
                            />
                        </div>
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>Email :</h6>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>LinkedIn :</h6>
                            <input
                                type="url"
                                className="form-control"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="Your LinkedIn"
                                required
                            />
                        </div>
                        <div className="control-group">
                            <h6 style={{ color: "white" }}>WhatsApp :</h6>
                            <input
                                type="number"
                                className="form-control"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="Your WhatsApp"
                                required
                            />
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button
                                className="btn"
                                type="submit"
                                id="sendMessageButton"
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

export default Addadvisor;
