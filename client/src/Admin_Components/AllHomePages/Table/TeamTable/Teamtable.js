import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Teamtable = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/team/view");
        setTeamMembers(response.data);
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
      const response = await axios.delete(`http://localhost:5000/api/team/delete/${id}`);
      if (response.status === 200) {
        setTeamMembers(teamMembers.filter(member => member._id !== id));
        toast.success(response.data.message, {position: "top-right"});
      }
    } catch (err) {
      setError("Failed to delete team member.");
      console.log(err);
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
        className="text-center mb-4 py-4 position-relative"
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <h1 className="fw-bold">Team Form</h1>
        <p className="text-muted">Your team form is here</p>
      </div>
      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Team List</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/team/addteam"} style={{ color: "white" }}>
              Add Member
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
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Position</th>
                <th scope="col">Description</th>
                <th scope="col">Facebook</th>
                <th scope="col">Email</th>
                <th scope="col">LinkedIn</th>
                <th scope="col">WhatsApp</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member,index) => (
                <tr key={member._id}>
                  <th scope="row">{index+1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/Upload/image/team/${member.image}`}
                      alt={member.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.description}</td>
                  <td>
                    {member.facebook}
                  </td>
                  <td>{member.email}</td>
                  <td>
                    {member.linkedin}
                  </td>
                  <td> 
                      {member.whatsapp}
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm">
                      <Link
                        to={`/admin/team/editteam/${member._id}`}
                        style={{ color: "white" }}
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    </button>
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
export default Teamtable;
