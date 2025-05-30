import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FooterTable = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/footer/viewfooter");
        setEvent(response.data); // Assuming the data is an array of team members
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load event.");
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, []);


  const handleDelete = async (id) => {
    try {
      // Send delete request to backend
      const response = await axios.delete(`http://localhost:5000/api/footer/deletefooter/${id}`);

      if (response.status === 200) {
        // Remove the team member from the state
        setEvent(event.filter(member => member._id !== id));
      }
    } catch (err) {
      setError("Failed to delete event.");
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
        <h1 className="fw-bold">Footer Table</h1>
        <p className="text-muted">Your footer list is here</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Footer List</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/footer/addfooter"} style={{ color: "white" }}>
              Add Footer
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
                <th scope="col">Title</th>
                <th scope="col">Address</th>
                <th scope="col">Number</th>
                <th scope="col">Email</th>
                <th scope="col">Twitar</th>
                <th scope="col">Facebook</th>
                <th scope="col">Youtube</th>
                <th scope="col">Instagram</th>
                <th scope="col">Linkedin</th>

                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              
              {event.map((member,index) => (
                <tr key={member._id}>
                  <th scope="row">{index+1}</th>

                  <td>{member.title}</td>
                  <td>{member.address}</td>
                  <td>{member.number}</td>
                  <td>{member.email}</td>
                  <td>{member.twitar}</td>
                  <td>{member.facebook}</td>
                  <td>{member.youtube}</td>
                  <td>{member.instagram}</td>
                  <td>{member.linkedin}</td>

                  
                  <td>
                    <button className="btn btn-warning btn-sm">
                      
                        <i className="fas fa-edit"></i>
                      
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member._id)}>
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

export default FooterTable;
