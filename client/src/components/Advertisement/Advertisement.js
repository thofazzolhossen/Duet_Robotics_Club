import React, { useEffect, useState } from "react";
import axios from "axios";

const Advertisement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/advertisement/getAllAdvertisement");
        setTeamMembers(response.data);
      } catch (err) {
        setError("Failed to load advertisements.");
      }
    };

    fetchTeamMembers();
  }, []);

  // Duplicate for seamless looping
  const duplicatedList = [...teamMembers, ...teamMembers];

  return (
    <div style={{ overflow: "hidden", width: "100%", background: "#f9f9f9", padding: "20px 0" }}>
      {error && <p>{error}</p>}

      <div className="scroll-wrapper">
        <div className="scroll-track">
          {duplicatedList.map((member, index) => (
            <div key={index} className="scroll-item">
              <img 
                src={`http://localhost:5000/Upload/image/advertisement/${member.image}`}
                alt={member.title}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
  ..scroll-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 10px 0;
}

.scroll-track {
  display: flex;
  width: max-content;
  animation: scroll-left 30s linear infinite;
  align-items: center;
}

.scroll-item {
  flex: none;
  margin-right: 200px;
  text-align: center;
  width: 150px;
}

.scroll-item img {
  display: block;
  padding: 10px;
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.4s ease;
  margin: 0 auto;
 
}

.scroll-item img:hover {
  transform: scale(1.08);
}

.scroll-item p {
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color:  #0a9396;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  
}

@media (max-width: 768px) {
  .scroll-item {
    margin-right: 80px;
    width: 100px;
  }

  .scroll-item img {
    width: 80px;
    height: 80px;
    padding: 6px;
  }

  .scroll-item p {
    font-size: 12px;
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

`}</style>

    </div>
  );
};

export default Advertisement;
