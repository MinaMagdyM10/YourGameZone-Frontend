import { Link } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiLayeredArmor } from "react-icons/gi";
import { IoFlashSharp } from "react-icons/io5";

function About() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">About Us</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          YourGameZone is your destination for premium gaming accessories built
          for performance, comfort, and style. We’re here to help every gamer
          create a setup they truly enjoy.
        </p>
      </div>

      <div className="row g-4 align-items-center mb-5">
        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <h3 className="mb-3">Who We Are</h3>
            <p className="text-muted mb-0">
              We are a modern gaming store focused on delivering quality
              accessories for gamers who want more from their setup. From
              keyboards and mice to headsets and controllers, we choose products
              that balance performance, durability, and clean design.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-4 h-100">
            <h3 className="mb-3">Our Mission</h3>
            <p className="text-muted mb-0">
              Our mission is simple: make it easier for gamers to find reliable,
              stylish, and high-performing accessories in one place. We want the
              shopping experience to feel smooth, trustworthy, and enjoyable
              from start to finish.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <h2 className="section-title mb-2">Why Choose YourGameZone</h2>
        <p className="text-muted mb-0">
          We care about quality, speed, and a better shopping experience.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card p-4 h-100 text-center why-card">
            <div className="why-icon mb-3">
              <LiaShippingFastSolid />
            </div>
            <h4>Fast Shipping</h4>
            <p className="text-muted mb-0">
              We work to deliver your gaming gear quickly and safely.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 h-100 text-center why-card">
            <div className="why-icon mb-3">
              <GiLayeredArmor />
            </div>
            <h4>Premium Quality</h4>
            <p className="text-muted mb-0">
              Our products are selected for performance, durability, and style.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 h-100 text-center why-card">
            <div className="why-icon mb-3">
              <IoFlashSharp />
            </div>
            <h4>Smooth Experience</h4>
            <p className="text-muted mb-0">
              From browsing to checkout, we aim to keep everything simple.
            </p>
          </div>
        </div>
      </div>

      <div className="card p-4 text-center">
        <h3 className="mb-3">Ready to Upgrade Your Setup?</h3>
        <p className="text-muted mb-4">
          Explore our collection and find the accessories that fit your gaming
          style.
        </p>
        <div>
          <Link to="/products" className="btn btn-neon">
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;