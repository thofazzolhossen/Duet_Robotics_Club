import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



const Subevent = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Correctly define queryParams
  const eventHeader = queryParams.get("header"); // Extract "header" from query

  const [eventData, setEventData] = useState([]); // Store an array of events
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subevent/viewsubevent");


        // If eventHeader is available, filter events by event name, else return all events
        //eventName, header
        const filteredEvents = eventHeader
          ? response.data.filter((e) => e.eventName === eventHeader)
          : response.data;

        if (filteredEvents.length > 0) {
          setEventData(filteredEvents); // Set eventData as an array
        } else {
          setError("No events found.");
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load events.");
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventHeader]);

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

            {/* Render all events */}
            {eventData.map((event, index) => (
              <div className="col-lg-4" key={index}>
                <div className="blog-item wow fadeInUp" data-wow-delay="0.3s">
                  <div className="blog-img">
                    <img
                      style={{ width: "350px", height: "300px" }}
                      src={`http://localhost:5000/Upload/image/subevent/${event.imageOrVideo}`}
                      alt={event.imageOrVideo}
                    />
                  </div>
                  <div className="blog-text">
                    <h2>{event.header}</h2>
                    <p>{event.description1}</p> {/* Displaying the description */}
                    <button
                      className="btn btn-primary"
                      style={{ position: "center" }}
                      onClick={() =>
                        navigate(
                          `/subevent/oneevent?header=${encodeURIComponent(event.header)}&eventName=${encodeURIComponent(event.eventName)}`
                        )
                      }
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

export default Subevent;
