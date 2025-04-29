import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Achivement = () => {
  const [achievements, setAchievements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/achive/getAllAchive'); // update path if needed
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const openModal = (item) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  return (
    <div>
<div className="portfolio py-5" id="portfolio">
  <div className="container">
    <div
      className="section-header text-center wow zoomIn mb-4"
      data-wow-delay="0.1s"
    >
      <p>Our Achievement</p>
      <h2>All of our achievements are our wealth</h2>
    </div>

    <div className="row portfolio-container wow fadeInUp">
  {achievements.map((item) => (
    <div
      className="col-lg-4 col-md-6 col-sm-12 mb-4 portfolio-item filter"
      key={item._id}
    >
      <div
        className="card h-100 shadow-lg border-0"
        style={{
          maxWidth: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div className="portfolio-img">
          <img
            src={`http://localhost:5000/Upload/image/achive/${item.image}`}
            alt={item.title}
            className="card-img-top img-fluid"
            style={{
              height: "250px",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{ minHeight: "160px" }}
        >
          <h5 className="card-title text-center mb-3 text-dark">
            {item.title}
          </h5>
          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() => openModal(item)}
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


  </div>
</div>


      {isModalOpen && selected && (
        <div
          className="modal-overlay"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050,
            overflowY: 'auto',
          }}
        >
          <div
            className="modal-content bg-white rounded shadow"
            style={{
              width: '90%',
              maxWidth: '800px',
              margin: '2rem auto',
            }}
          >
            {/* Modal Header */}
            <div className="modal-header d-flex justify-content-end border-0">
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeModal}
                style={{ fontSize: '1rem' }}
              >
                Close
              </button>
            </div>

            {/* Modal Body http://localhost:5000/api/achive/getAllAchive*/}
            <div className="modal-body px-4">
              <img
                src={`http://localhost:5000/Upload/image/achive/${selected.image}`}
                alt={selected.title}
                className="img-fluid mb-3 rounded"
                style={{ objectFit: 'cover', width: '100%' }}
              />

              <h2 className="bg-danger text-white p-3 rounded text-center fs-4">
                {selected.maintitle}
              </h2>

              <div className="mt-4">
                <p className="lh-lg text-dark shadow p-3">{selected.description1}</p>
                <p className="lh-lg text-dark shadow p-3">{selected.description2}</p>
                <p
                  className="text-muted shadow p-3"
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {selected.description3}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer border-0 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-danger"
                onClick={closeModal}
                style={{ fontSize: '1rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achivement;
