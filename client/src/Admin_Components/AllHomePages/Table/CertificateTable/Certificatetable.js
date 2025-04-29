import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const Certificatetable = () => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/certificate/allCertificate");
        setTeamMembers(response.data); // Assuming the data is an array of team members
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load team members.");
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);


  const handleDelete = async (id, image) => {
    try {
      // Send delete request to backend
      const response = await axios.delete(`http://localhost:5000/api/certificate/deleteCertificate/${id}`);

      if (response.status === 200) {
        // Remove the team member from the state
        setTeamMembers(teamMembers.filter(member => member._id !== id));
      }
    } catch (err) {
      setError("Failed to delete team member.");
      console.log(err);
    }
  };


  const handleDownloadQRCode = (code) => {
    const url = `http://localhost:3000/show/${code}`;
    const canvas = document.createElement("canvas");
  
    // Check if there's already a QR code for the given code
    const qrCanvas = document.querySelector(`[data-code='${code}'] canvas`);
    if (!qrCanvas) {
      // Generate a new QR code if not present
      QRCodeCanvas({ value: url, size: 300, includeMargin: true, canvas: canvas });
    } else {
      // Use the existing QR code canvas if available
      canvas.width = qrCanvas.width;
      canvas.height = qrCanvas.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(qrCanvas, 0, 0);
    }
  
    // Convert canvas to data URL and download
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${code}.png`;
    link.click();
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
        className="text-center mb-4 py-4 position-relative"
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <h1 className="fw-bold">Certificate</h1>
        <p className="text-muted">Your Certificate data is here</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Certificate List</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/certificate/addcertificate"} style={{ color: "white" }}>
              Add Certificate
            </Link>
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ backgroundColor: "#0a9396", color: "white" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Event Name</th>
              <th scope="col">Univarsity</th>
              <th scope="col">Position</th>
              <th scope="col">Year</th>
              <th scope="col">Code</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {teamMembers.reverse().map((member,index) => (
            <tr key={member._id}>
              <th scope="row">{index+1}</th>
              <td>
              <img
                      src={`http://localhost:5000/Upload/image/certificate/${member.image}`}
                      alt={member.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
              </td>
              <td>{member.name}</td>
              <td>{member.event}</td>
              <td>{member.univarsity}</td>
              <td>{member.position}</td>
              <td>{member.year}</td>
              <td data-code={member.code} onClick={() => handleDownloadQRCode(member.code)}>
                    <QRCodeCanvas
                      value={`http://localhost:3000/show/${member.code}`}
                      size={150}
                      level={"H"}
                      style={{ display: "block", margin: "auto", cursor: "pointer"}}
                    />
                  </td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
                {/* Edit button */}
              </td>
              <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member._id, member.image)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
              </td>
            </tr>
           ))} 
          </tbody>
        </table>

)}
      </div>


    </div>
  );
};

export default Certificatetable;
