import React from 'react';
import { ReactTyped as Typed } from 'react-typed';
import hero from '../../img/hero.png';

const Hero = () => {
  return (
    <>
      <div className="hero" id="home">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-6">
              <div className="hero-content">
                <div className="hero-text">
                  <p>I'm</p>
                  <h1>Kate Winslet</h1>
                  <div style={{   fontSize: '35px',fontWeight: '650',color: '#ffffff' }} >
                  <Typed strings={[ 'Web Designer','Web Developer','Front End Developer','Apps Designer','Apps Developer']} typeSpeed={50} backSpeed={30}
                    loop
                  />
                  </div>
                  
                </div>
                <div className="hero-btn">
                  <a className="btn" href="/">Hire Me</a>
                  <a className="btn" href="/">Contact Me</a>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 d-none d-md-block">
              <div className="hero-image">
                <img src={hero} alt="Hero Imagee" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ >
  );
}

export default Hero;
