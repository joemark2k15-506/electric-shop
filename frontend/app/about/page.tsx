import React from "react";

const About: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", padding: "50px" }}>
      <div className="card p-5 shadow-lg text-center" style={{ maxWidth: "900px", borderRadius: "20px", background: "#fff", color: "#333", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        <h2 className="mb-4" style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)", fontSize: "2.5rem", fontWeight: "bold", color: "#2c3e50" }}>About Us</h2>
        <p style={{ fontSize: "1.2rem", fontWeight: "500", color: "#555" }}>
          Welcome to <strong>Electro Shop</strong>, your trusted destination for premium electrical products. Based in Chennai, Tamil Nadu, we have been proudly serving customers since 2010, offering high-quality electrical solutions at unbeatable prices.
        </p>
        <div className="row mt-4">
          <div className="col-md-12">
            <h4 style={{ fontWeight: "bold", color: "#2980b9" }}>Our Mission</h4>
            <p>
              Our mission is to empower homes and businesses with top-tier electrical products that guarantee safety, efficiency, and innovation. We prioritize customer satisfaction with exceptional service and cutting-edge technology.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <h4 style={{ fontWeight: "bold", color: "#2980b9" }}>Why Choose Us?</h4>
            <ul style={{ listStyleType: "none", paddingLeft: 0, fontSize: "1.1rem", fontWeight: "500", color: "#555" }}>
              <li>⚡ Wide range of electrical products</li>
              <li>✅ Certified and high-quality materials</li>
              <li>💰 Affordable pricing with great discounts</li>
              <li>🚚 Fast and secure delivery across Tamil Nadu</li>
              <li>📞 24/7 dedicated customer support</li>
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <h4 style={{ fontWeight: "bold", color: "#2980b9" }}>Visit Our Store</h4>
          <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#444" }}>789 Energy Street, Chennai, Tamil Nadu, India</p>
          <p style={{ fontSize: "1.1rem", fontWeight: "500", color: "#555" }}>Email: support@electrotamil.com | Phone: +91 8248344143</p>
        </div>
      </div>
    </div>
  );
};

export default About;
