import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ReactTyped as Typed } from 'react-typed';
import  { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Sliders = () => {
  const [teamMembers, setTeamMembers] = useState([]);
const [error, setError] = useState(null);


useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/slider/view");
        setTeamMembers(response.data); 
        
      } catch (err) {
        setError("Failed to load team members.");
        
      }
    };

    fetchTeamMembers();


    // Show notification
     toast.success("DUET Robotics Club Official  Website. You can create project with us.", {
      position: "bottom-right",
      autoClose: 4000,
    });

      toast.success("You can visit us. Here add our team members, our achivements. You can also verify your certificate which is provide by DRC", {
        position: "bottom-right",
        autoClose: 6000,
        style: { backgroundColor: '#0a9396', color: 'white',borderRadius: '10px' }
      });

  }, []);



  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 6000,
    navText: [
      '<i class="fas fa-chevron-left cornerIcon"></i>',
      '<i class="fas fa-chevron-right cornerIcon"></i>',
    ],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };



  return (
    <>
   

      <ToastContainer />


      <style>
        {`
        .cornerIcon{
          font-Size: 30px;
          color: #0a9396;
          padding:10px;
        }
        .cornerIcon:hover{
          color: white;
          background-color: #0a9396;

        }
          .slider-container {
            width: 100%;
            max-width: 100%; /* Restrict the width to a medium size */
            margin: auto;
            margin-top: 50px;
            position: relative;
            max-height: 600px; /* Set the maximum height for the slider */
          }
          .item {
            position: relative;
            max-height: 600px; /* Prevent images from exceeding the height */
          }

          .item img {
            width: 100%;
            height: 100%;
            max-height: 600px;
            object-fit: cover; /* Ensure images fit nicely */
            display: block;
          }

          .caption {
          text-align:center;
            position: absolute;
            bottom: 200px;
            left: 200px;
            color: white;
            
            padding: 10px 15px;
            border-radius: 5px;
          }
          .caption h2 {
    margin: 0;
    position: relative;
    font-size: 35px;
    font-weight: 700;
    background-color: rgba(10, 147, 150, 0.8); /* Reduced opacity */
    color: #fff;
    text-align: center;
    padding: 10px 20px; /* Add padding for better spacing */
    border-radius: 25px; /* Rounded corners */
  }

  .caption p {
    background-color: rgba(255, 255, 255, 0.8); /* Reduced opacity for the background */
    text-align: center;
    padding: 10px 20px; /* Add padding for better spacing */
    border-radius: 15px; /* Rounded corners */
    font-size: 20px;
    font-weight: 600;
    color: black;
    margin-top: 10px;
  }
            /* Mobile View: Adjustments for smaller screens */
  @media (max-width: 767.98px) {
    .caption {
      bottom: 50px;
      left: 10px;
      right: 10px;
      padding: 10px;
      font-size: 18px;
    }

    .caption h2 {
      font-size: 24px;
    }

    .caption p {
      font-size: 16px;
      font-weight: 400;
      margin-top: 5px;
    }

    .owl-nav .owl-prev,
    .owl-nav .owl-next {
      font-size: 24px;
      padding: 8px;
    }

    /* Ensure text is centered */
    .caption h2, .caption p {
      text-align: center;
    }
  }

  @media (max-width: 1024px) {
    .caption {
      bottom: 100px; /* Adjust for tablets */
    }
  }

          /* Navigation buttons in middle left and right */
          .owl-nav {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            color: #0a9396;
            
          }
            .owl-nav .owl-prev,
.owl-nav .owl-next {
  outline: none; /* Remove the black border */
  border: none;  /* Remove any border styles */
}

          .owl-nav .owl-prev,
          .owl-nav .owl-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            font-size: 18px;
          }

          .owl-nav .owl-prev {
            left: 10px;
          }

          .owl-nav .owl-next {
            right: 10px;
          }

          /* Dots on the upper-down side of the image */
          .owl-dots {
            position: absolute;
            bottom: 10px; /* Move dots inside the slider */
            left: 50%;
            
            transform: translateX(-50%);
            z-index: 2;
            background: #0a9396;
            color: yellow;
          }

          .owl-dots .owl-dot {
            width: 12px;
            height: 12px;
            margin: 5px;
            
            border-radius: 50%;
            display: inline-block;
            background: red;
          }


        .typed-cursor {
                        color: black;
                        border-color: black;
                    }

          
        `}
      </style>
      <div className="slider-container">
        <OwlCarousel className="owl-theme" {...options}>
        {teamMembers.map((member,index) => (
          <div className="item" key={index}>
            <img  style={{
                        width: "100%",
                        height: "700px",
                        objectFit: "cover",
                      }}
                       src={`http://localhost:5000/Upload/image/slider/${member.image}`} alt="Slide 1" />
            <div className="caption wow fadeInUp" data-wow-delay="0.1s">
              <h2>
                <Typed strings={[member.title1, member.title2, 'Grow Every Day']} typeSpeed={50} backSpeed={30}
                  loop
                />
              </h2>
              <p className="wow fadeInRight" data-wow-delay="0.5s" style={{color: 'black',marginLeft:"100px",fontSize: "30px",fontWeight:"600"}}>{member.title2}</p>
            </div>
          </div>
         ))} 

        </OwlCarousel>
      </div>
    </>
  );
};

export default Sliders;
