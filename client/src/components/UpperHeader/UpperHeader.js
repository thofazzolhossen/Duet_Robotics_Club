import React, { useEffect, useState} from 'react';
import axios from "axios";



const UpperHeader = () => {
    const [event, setEvent] = useState([]);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchEvent = async () => {
          try {
            const response = await axios.get("http://localhost:5000/api/uperheader//viewuperheader");
            setEvent(response.data); // Assuming the data is an array
          } catch (err) {
            setError("Failed to load event.");
          }
        };
    
        fetchEvent();
      }, []);



  return (
    <div>



<section class="header-section container">
    <div class="row">
       
        <div class="col-xl-3 col-md-6 col-sm-12">
            <div class="location text-center wow fadeInUp"data-wow-delay="0.1s">
                <p class="inline-block"><i class="fa fa-map-marker"></i></p>
                <p class="inline-block "><b>{event[0]?.title}</b></p>
                <h6>{event[0]?.description1}</h6>
                <h6>{event[0]?.description2}</h6>
            </div>
        </div>
        
        <div class="col-xl-3 col-md-6 col-sm-12">
            <div class="location text-center wow fadeInUp"  data-wow-delay="0.4s">
                <p class="inline-block"><i class="fa fa-home"></i></p>
                <p class="inline-block"><b>{event[1]?.title}</b></p>
                <h6>{event[1]?.description1}</h6>
                <h6>{event[1]?.description2}</h6>
            </div>
        </div>
       
        <div class="col-xl-3 col-md-6 col-sm-12">
            <div class="location text-center wow fadeInUp"data-wow-delay="0.8s">
                <p class="inline-block"><i class="fa fa-envelope" style={{Color: "EF233C"}}></i></p>
                <p class="inline-block"><b>{event[2]?.title}</b></p>
                <h6><a href="mailto:info@pediatrics.com">{event[2]?.description1}</a></h6>
                <h6><a href="mailto:info@pediatrics.com">{event[2]?.description2}</a></h6>
            </div>
        </div>
       
        <div class="col-xl-3 col-md-6 col-sm-12">
            <div class="location text-center wow fadeInUp" data-wow-delay="1.2s">
                <p class="inline-block"><i class="fa fa-phone"></i></p>
                <p class="inline-block"><b>{event[3]?.title}</b></p>
                <h6>{event[3]?.description1}</h6>
                <h6>{event[3]?.description2}</h6>
            </div>
        </div>
    </div>
</section>


    </div>
  )
}

export default UpperHeader