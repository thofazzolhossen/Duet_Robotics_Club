import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from "axios";

const CountdownBar = () => {
  const [event, setEvent] = useState([]);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({
    teamMembers: 0,
    projects: 0,
    wins: 0,
  });
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const sectionRef = useRef(null); // Reference for the section to observe

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/countdown/viewcountdown");
        setEvent(response.data); // Assuming the data is an array
      } catch (err) {
        setError("Failed to load event.");
      }
    };

    fetchEvent();
  }, []);

  // Compute target counts only when the event data changes
  const targetCounts = useMemo(() => {
    if (event.length > 0) {
      return {
        teamMembers: event[0]?.value1 || 0, // Use a fallback in case value1 is undefined
        projects: event[0]?.value2 || 0,   // Use a fallback in case value2 is undefined
        wins: event[0]?.value3 || 0,       // Use a fallback in case value3 is undefined
      };
    }
    return { teamMembers: 0, projects: 0, wins: 0 };
  }, [event]);

  useEffect(() => {
    const incrementCounts = () => {
      const interval = setInterval(() => {
        setCounts((prevCounts) => {
          const newCounts = { ...prevCounts };

          Object.keys(targetCounts).forEach((key) => {
            if (prevCounts[key] < targetCounts[key]) {
              newCounts[key] = prevCounts[key] + 1; // Increment count by 1
            }
          });

          // Clear interval when all counts reach their target
          if (
            newCounts.teamMembers >= targetCounts.teamMembers &&
            newCounts.projects >= targetCounts.projects &&
            newCounts.wins >= targetCounts.wins
          ) {
            clearInterval(interval);
          }

          return newCounts;
        });
      }, 15); // Adjust speed of the animation
    };

    if (isVisible && event.length > 0) {
      incrementCounts();
    }
  }, [targetCounts, event, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );
  
    const currentRef = sectionRef.current; // Save the current value of the ref
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div
      ref={sectionRef}
      className='wow fadeInUp'
      data-wow-delay="0.2s"
      style={{ padding: '20px', backgroundColor: '#0a9396', width: '100%' }}
    >
      <div className="row text-center">
        {/* Team Members */}
        <div className="col-md-4" style={{ marginBottom: '20px' }}>
          <h2><i style={{ color: 'white' }} className="fas fa-users"></i></h2>
          <h2 style={{ color: 'white' }}>{event[0]?.title1}</h2>
          <div style={{ fontSize: '50px', color: '#ffffffff', fontWeight: 'bold' }}>{counts.teamMembers}</div>
        </div>

        {/* Projects */}
        <div className="col-md-4" style={{ marginBottom: '20px' }}>
          <h2><i style={{ color: 'white' }} className="fas fa-clipboard-list"></i></h2>
          <h2 style={{ color: 'white' }}>{event[0]?.title2}</h2>
          <div style={{ fontSize: '50px', color: '#ffffffff', fontWeight: 'bold' }}>{counts.projects}</div>
        </div>

        {/* Competition Wins */}
        <div className="col-md-4" style={{ marginBottom: '20px' }}>
          <h2><i style={{ color: 'white' }} className="fas fa-trophy"></i></h2>
          <h2 style={{ color: 'white' }}>{event[0]?.title3}</h2>
          <div style={{ fontSize: '50px', color: '#ffffffff', fontWeight: 'bold' }}>{counts.wins}</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;
