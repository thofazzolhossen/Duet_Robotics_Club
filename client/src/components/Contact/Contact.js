import React, { useState } from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (!value.trim()) {
      console.log(`${id} cannot be empty.`);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.success('All fields are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Email sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      toast.success('Failed to send the message. Please try again later.');
    }
  };
  return (
    <div>
      <div className="contact wow fadeInUp" data-wow-delay="0.1s" id="contact">
        <div
          className="container-fluid"
          style={{
            backgroundImage: 'white',
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <div className="contact-form">
                  <form
                    name="sentMessage"
                    id="contactForm"
                    noValidate="novalidate"
                    onSubmit={handleSubmit}
                  >
                    <div className="control-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <p className="help-block"></p>
                    </div>
                    <div className="control-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <p className="help-block"></p>
                    </div>
                    <div className="control-group">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                      <p className="help-block"></p>
                    </div>
                    <div className="control-group">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <p className="help-block"></p>
                    </div>
                    <div>
                      <button
                        className="btn"
                        type="submit"
                        id="sendMessageButton"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
