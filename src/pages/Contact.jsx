import { useState, useEffect } from "react";
import api from "../services/api";
import ToastMessage from "../components/ToastMessage";

function Contact() {
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contacts", formData);
      showToast("Message sent successfully", "success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Failed to send message", "error");
    }
  };

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-muted">
          We’d love to hear from you. Send us your questions or feedback.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-7">
          <form
            onSubmit={handleSubmit}
            className="card shadow-sm border-0 p-4 h-100"
          >
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-neon">
              Send Message
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4 h-100">
            <h4 className="mb-3">Get in Touch</h4>
            <p>
              <strong>Store Name:</strong> YourGameZone
            </p>
            <p>
              <strong>Email:</strong> support@yourgamezone.com
            </p>
            <p>
              <strong>Phone:</strong> +20 123 456 7890
            </p>
            <p>
              <strong>Address:</strong> Cairo, Egypt, Rod El Farag 
            </p>
            <p className="text-muted mb-0">
              We’re here to help with product questions, order support, and
              general feedback.
            </p>
          </div>
        </div>
      </div>

      <section className="faq-section">
        <div className="text-center mb-4">
          <h2 className="section-title mb-2">Frequently Asked Questions</h2>
          <p className="text-muted mb-0">
            Find quick answers to the most common questions.
          </p>
        </div>

        <div className="accordion" id="faqAccordion">
          <div className="accordion-item mb-3 border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqOne"
                aria-expanded="true"
                aria-controls="faqOne"
              >
                What is your return policy?
              </button>
            </h2>
            <div
              id="faqOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                We offer a 30-day return policy on all products. Items must be
                in original condition with all packaging.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-3 border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqTwo"
                aria-expanded="false"
                aria-controls="faqTwo"
              >
                Do you ship internationally?
              </button>
            </h2>
            <div
              id="faqTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes! We ship to most countries worldwide. Shipping costs and
                delivery times vary by location.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-3 border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqThree"
                aria-expanded="false"
                aria-controls="faqThree"
              >
                How long does shipping take?
              </button>
            </h2>
            <div
              id="faqThree"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Standard shipping takes 3-5 business days. Express shipping
                options are available at checkout.
              </div>
            </div>
          </div>

          <div className="accordion-item border-0 rounded-4 overflow-hidden shadow-sm">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqFour"
                aria-expanded="false"
                aria-controls="faqFour"
              >
                Do you offer warranty on products?
              </button>
            </h2>
            <div
              id="faqFour"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                All products come with manufacturer warranty. Extended warranty
                options are available for select items.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;