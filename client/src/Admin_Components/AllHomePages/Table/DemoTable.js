import React from "react";

const Demotable = () => {

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center wow fadeInUp"
      data-wow-delay="0.1s"
      id="contact"
      style={{
        backgroundColor: "#f0f8ff",
        marginBottom: "100px",
        height: "auto",
        overflow: "hidden",
        padding: "20px",
      }} // Light background color
    >
      <div
        className="text-center mb-4 py-4"
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
        <h1 className="fw-bold">Form Page</h1>
        <p className="text-muted">Your form is here</p>
      </div>

      <div
        className="card shadow-lg p-4 mt-4"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <h3 className="text-center mb-4">Smart Colorful Table</h3>
        <table className="table table-striped table-hover table-bordered">
          <thead style={{ backgroundColor: "#0a9396", color: "white" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Subject</th>
              <th scope="col">Message</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>Inquiry</td>
              <td>Can you help me with my order?</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
                {/* Edit button */}
              </td>
              <td>
                <button className="btn btn-danger btn-sm">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>Support</td>
              <td>I'm having trouble accessing my account.</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
                {/* Edit button */}
              </td>
              <td>
                <button className="btn btn-danger btn-sm">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Bob Johnson</td>
              <td>bob@example.com</td>
              <td>Feedback</td>
              <td>The website could be more user-friendly.</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
                {/* Edit button */}
              </td>
              <td>
                <button className="btn btn-danger btn-sm">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Hello</td>
              <td>how@example.com</td>
              <td>Are You</td>
              <td>Just checking in!</td>
              <td>
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
                {/* Edit button */}
              </td>
              <td>
                <button className="btn btn-danger btn-sm">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Demotable;
