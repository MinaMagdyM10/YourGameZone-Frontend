import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-section mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="footer-brand">🎮 YourGameZone</h4>
            <p className="footer-text">
              Premium gaming accessories for every setup.
            </p>

            <div className="footer-socials">
              <a
                href="https://www.facebook.com/mina.magdy.929174"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <span className="social-icon">
                  <FaFacebookF />
                </span>
              </a>

              <a
                href="https://www.instagram.com/_1_mina_1_m10"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <span className="social-icon">
                  <FaInstagram />
                </span>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Categories</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/products">Gaming Mice</Link>
              </li>
              <li>
                <Link to="/products">Keyboards</Link>
              </li>
              <li>
                <Link to="/products">Headsets</Link>
              </li>
              <li>
                <Link to="/products">Controllers</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Support</h5>
            <ul className="footer-links list-unstyled">
              <li>
                <Link to="/contact">Shipping Info</Link>
              </li>
              <li>
                <Link to="/contact">Returns</Link>
              </li>
              <li>
                <Link to="/contact">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Support</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0">© 2026 YourGameZone. All rights reserved.</p>

          <div className="footer-policy d-flex gap-3">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;