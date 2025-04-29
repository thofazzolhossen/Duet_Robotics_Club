import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowCertificate = () => {
    const { code } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/certificate/oneCertificate/${code}`
                );
                setCertificate(response.data);
                setIsLoading(false);
            } catch (err) {
                setError("Failed to load certificate.");
                setIsLoading(false);
            }
        };

        fetchCertificate();
    }, [code]);


    



    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                padding: "20px",
                backgroundColor: "#f8f9fa",
                fontFamily: "'Roboto', sans-serif",
            }}
        >
            <h2>
                DUET Robotics CLub
            </h2>
            <h1 style={{ color: "#333", fontWeight: "700", marginBottom: "20px" }}>
                 valid certificate
            </h1>
            <div
                className="card shadow-lg"
                style={{
                    maxWidth: "600px",
                    width: "100%",
                    padding: "20px",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                }}
            >
                <h3 style={{ fontWeight: "600", marginBottom: "15px" }}>{certificate.name}</h3>
                <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Event:</strong> {certificate.event}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>University:</strong> {certificate.univarsity}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Position:</strong> {certificate.position}
                </p>
                <p style={{ margin: "5px 0", color: "#555" }}>
                    <strong>Year:</strong> {certificate.year}
                </p>
                <div style={{ margin: "20px 0" }}>
                    <img
                        src={`http://localhost:5000/Upload/image/certificate/${certificate.image}`}
                        alt="Certificate"
                        style={{
                            width: "100%",
                            borderRadius: "8px",
                            cursor: "pointer",
                            border: "2px solid #ddd",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    
                    style={{ padding: "10px 20px", fontSize: "16px" }}
                >
                  
                        Download
                    

                </button>
            </div>
        </div>
    );
};

export default ShowCertificate;
