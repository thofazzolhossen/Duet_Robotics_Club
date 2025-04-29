import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Testimonialtable = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/testimonial/view");
        setTeamMembers(response.data); // Assuming the data is an array of team members
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load testimonial.");
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);


  const handleDelete = async (id, image) => {
    try {
      // Send delete request to backend
      const response = await axios.delete(`http://localhost:5000/api/testimonial/delete/${id}`);

      if (response.status === 200) {
        // Remove the team member from the state
        setTeamMembers(teamMembers.filter(member => member._id !== id));
      }
    } catch (err) {
      setError("Failed to delete testimonial.");
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
        <h1 className="fw-bold">Testimonial Form</h1>
        <p className="text-muted">Your testimonial form is here</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Testimonial List</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/testimonial/addtestimonial"} style={{ color: "white" }}>
              Add Testimonial
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
                      src={`http://localhost:5000/Upload/image/testimonial/${member.image}`}
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
                    <button className="btn btn-warning btn-sm">
                      
                        <i className="fas fa-edit"></i>
                      
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

export default Testimonialtable;
