import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/event/viewevent");
        setEvents(response.data || []); // Ensure it's an array
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load events.");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div className="blog" id="blog">
        <div className="container">
          <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
            <p>From Event</p>
            <h2>Latest Event</h2>
          </div>

          <div className="row">
            {isLoading && <p>Loading events...</p>}
            {error && <p>{error}</p>}
            {events.map((event, index) => (
              <div className="col-lg-6" key={index}>
                <div className="blog-item wow fadeInUp" data-wow-delay="0.3s">
                  <div className="blog-img">
                    <img
                      style={{ width: "600px", height: "400px" }}
                      src={`http://localhost:5000/Upload/image/event/${event?.image}`}
                      alt={event?.title || "Event Image"}
                    />
                  </div>
                  <div className="blog-text">
                    <h2>{event?.title}</h2>
                    <div className="blog-meta">
                      <p><i className="fab fa-facebook-f"></i> Facebook</p>
                      <p><i className="fab fa-whatsapp"></i> WhatsApp</p>
                      <p><i className="fab fa-linkedin"></i> LinkedIn</p>
                      <p><i className="fas fa-envelope"></i> Email</p>
                    </div>
                    <p>{event?.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/subevent?header=${event?.title}`)} // Use navigate instead of window.location
                    >
                      Read More <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
