import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container py-5">
      <h2 className="contact-title text-center">Contact Us</h2>

      <div className="row g-5 align-items-start">
        {/* LEFT INFO */}
        <div className="col-md-5">
          <div className="contact-info">
            <h5 className="contact-subtitle">Get in touch</h5>

            <p className="contact-text">
              <FaMapMarkerAlt className="me-2 text-warning" />
              Warsaw, Poland
            </p>

            <p className="contact-text">
              <FaEnvelope className="me-2 text-warning" />
              support@tupup.com
            </p>

            <p className="contact-text">
              <FaPhone className="me-2 text-warning" />
              +48 500 200 300
            </p>

            <h6 className="contact-subtitle mt-4">Working hours</h6>
            <p className="contact-text">Mon – Fri: 9:00 – 18:00</p>
            <p className="contact-text">Sat – Sun: Closed</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-md-7">
          <div className="contact-form">
            {sent ? (
              <div className="contact-success">
                <h5>Thank you! 💛</h5>
                <p>
                  Your message has been sent. <br />
                  Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="contact-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}