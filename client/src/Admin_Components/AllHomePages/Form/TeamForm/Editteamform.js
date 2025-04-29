import React, { useState } from "react";
import { Link } from "react-router-dom";

const Editteamform = () => {
    const [hover, setHover] = useState(false);

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
            }} // Light background color
        >
            <div
                className="text-center mb-4 py-4"
                style={{ marginTop: "50px", marginBottom: "100px" }}
            >
                <div className="d-flex align-items-center justify-content-between p-3">
                    <button className="btn btn-primary"> <Link to={"/admin"} className="fa fa-arrow-left"></Link> </button>
                    <h1 className="fw-bold mx-auto">Modify Your Team</h1>
                </div>
                <p className="text-muted">
                    You can add members, remove members or modify here
                </p>
            </div>

            <div
                className="card shadow-lg p-4 py-5"
                style={{ width: "100%", maxWidth: "400px", background: "#0a9396" }}
            >
                <div class="contact-form">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" novalidate="novalidate">
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Name :</h6>
                            <input
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Members Name within 18 character"
                                required="required"
                                data-validation-required-message="Please enter members name"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Position :</h6>
                            <input
                                type="text"
                                class="form-control"
                                id="position"
                                placeholder="Members Position within 18 character"
                                required="required"
                                data-validation-required-message="Please enter members position"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Description :</h6>
                            <input
                                type="text"
                                class="form-control"
                                id="description"
                                placeholder="description within 65 character"
                                required="required"
                                data-validation-required-message="Please enter members description within 65 character"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Image :</h6>
                            <input
                                type="file"
                                class="form-control"
                                id="image"
                                placeholder="description"
                                required="required"
                                data-validation-required-message="Please enter image"
                            />
                            <p class="help-block"></p>
                        </div>

                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Facebook :</h6>
                            <input
                                type="url"
                                class="form-control"
                                id="fblink"
                                placeholder="Facebook Link"
                                required="required"
                                data-validation-required-message="Please enter facebook link"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>Email :</h6>
                            <input
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="Your Email"
                                required="required"
                                data-validation-required-message="Please enter your email"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>LinkedIn :</h6>
                            <input
                                type="url"
                                class="form-control"
                                id="linkedin"
                                placeholder="Your LinkedIn"
                                required="required"
                                data-validation-required-message="Please enter your linkedIn"
                            />
                            <p class="help-block"></p>
                        </div>
                        <div class="control-group">
                            <h6 style={{ color: "white" }}>WhatsApp :</h6>
                            <input
                                type="number"
                                class="form-control"
                                id="whatsapp"
                                placeholder="Your WhatsApp"
                                required="required"
                                data-validation-required-message="Please enter your whatsapp number"
                            />
                            <p class="help-block"></p>
                        </div>



                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <button
                                class="btn"
                                type="submit"
                                id="sendMessageButton"
                                style={{
                                    marginTop: "35px",
                                    color: hover ? "Black" : "#0a9396",
                                    backgroundColor: hover ? "#0a9396" : "#ffffff", // White background when not hovered
                                    border: "2px solid #0a9396", // Red border to match the text color
                                    boxShadow: "inset 0 0 0 50px #ffffff",
                                    transition: "background-color 0.3s, color 0.3s, border 0.3s", // Smooth transition
                                }}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editteamform;
