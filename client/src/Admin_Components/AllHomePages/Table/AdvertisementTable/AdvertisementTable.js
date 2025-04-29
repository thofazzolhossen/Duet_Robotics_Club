import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdvertisementTable = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/advertisement/getAllAdvertisement");
        setAdvertisements(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load advertisements.");
        setIsLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleDelete = async (id, image) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/advertisement/deleteAdvertisement/${id}`);
      if (response.status === 200) {
        setAdvertisements(advertisements.filter((ad) => ad._id !== id));
      }
    } catch (err) {
      setError("Failed to delete advertisement.");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center wow fadeInUp"
      data-wow-delay="0.1s"
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
        <h1 className="fw-bold">Advertisement List</h1>
        <p className="text-muted">Your Current Advertisements</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "1000px", overflowX: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4 mx-auto">Advertisement Table</h3>
          <button className="btn btn-primary">
            <Link to={"/admin/advertisement/add"} style={{ color: "white" }}>
              Add Advertisement
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {advertisements.map((ad, index) => (
                <tr key={ad._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={`http://localhost:5000/Upload/image/advertisement/${ad.image}`}
                      alt={ad.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{ad.name}</td>
                  <td>
                    <button className="btn btn-warning btn-sm">
                      <Link to={`/admin/advertisement/edit/${ad._id}`} style={{ color: "white" }}>
                        <i className="fas fa-edit"></i>
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(ad._id, ad.image)}
                    >
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

export default AdvertisementTable;
