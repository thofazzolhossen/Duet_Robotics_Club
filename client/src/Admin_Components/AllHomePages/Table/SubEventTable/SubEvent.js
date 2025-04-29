import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SubEventTable = () => {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members from the backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subevent/viewsubevent");
        setEvent(response.data); // Assuming the data is an array of team members
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load event.");
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, []);


  const handleDelete = async (id, image) => {
    try {
      // Send delete request to backend
      const response = await axios.delete(`http://localhost:5000/api/subevent/deletesubevent/${id}`);

      if (response.status === 200) {
        // Remove the team member from the state
        setEvent(event.filter(member => member._id !== id));
      }
    } catch (err) {
      setError("Failed to delete event.");
      
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
        <h1 className="fw-bold">Sub Event Table</h1>
        <p className="text-muted">Your sub event list is here</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Sub Event List</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/event/subevent"} style={{ color: "white" }}>
              Add Sub Event
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
                <th scope="col">Event Name</th>
                <th scope="col">Sub Image</th>
                <th scope="col">Header</th>
                <th scope="col">Description 1</th>
                <th scope="col">DemoPicture</th>
                <th scope="col">Description 2</th>
                <th scope="col">links</th>
                <th scope="col">Delete</th>
                
              </tr>
            </thead>
            <tbody>
              
              {event.map((member,index) => (
                <tr key={member._id}>
                  
                  <td>{member.eventName}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/Upload/image/subevent/${member.imageOrVideo}`}
                      alt={member.imageOrVideo}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{member.header}</td>
                  <td>{member.description1?.substring(0, 20) + (member.description1?.length > 20 ? '...' : '')}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/Upload/image/subevent/${member.demoPicture}`}
                      alt={member.demoPicture}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{member.description2?.substring(0, 20) + (member.description2?.length > 20 ? '...' : '')}</td>

                  <td>{member.links?.substring(0, 20) + (member.links?.length > 20 ? '...' : '')}</td>
                 

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

export default SubEventTable;
