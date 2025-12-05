import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact: React.FC = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-5 shadow-lg" style={{ borderRadius: "20px", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "white" }}>
        <h2 className="text-center mb-4" style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)", fontWeight: "bold" }}>Contact Us</h2>
        <div className="row">
          <div className="col-md-6">
            <h4>Get in Touch</h4>
            <p>If you have any questions, feel free to reach out to us.</p>
            <ul className="list-unstyled">
              <li><strong>Address:</strong> 456 Tamil Nadu Street, Chennai, TN 600001</li>
              <li><strong>Email:</strong> support@electroshop.com</li>
              <li><strong>Phone:</strong> +91 98765 43210</li>
              <li><strong>Working Hours:</strong> Mon - Sat: 9:00 AM - 7:00 PM</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Contact Form</h4>
            <form className="p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.2)", borderRadius: "10px", backdropFilter: "blur(10px)" }}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control shadow-sm" id="name" placeholder="Your Name" style={{ borderRadius: "10px" }} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control shadow-sm" id="email" placeholder="Your Email" style={{ borderRadius: "10px" }} />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control shadow-sm" id="message" rows={4} placeholder="Your Message" style={{ borderRadius: "10px" }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 shadow" style={{ borderRadius: "10px", background: "#ff9800", border: "none", fontWeight: "bold" }}>Send Message</button>
            </form>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4>Find Us on the Map</h4>
          <iframe
            title="Location Map"
            src="https://maps.google.com/maps?q=13.0827,80.2707&z=15&output=embed"
            style={{ width: "100%", height: "400px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
