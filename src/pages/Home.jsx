import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GiLayeredArmor } from "react-icons/gi";
import { IoFlashSharp } from "react-icons/io5";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get("/products");
      setFeaturedProducts(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  return (
    <div>
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-glow-two"></div>

        <div className="container position-relative">
          <div className="row align-items-start g-5">
            <div className="col-lg-6">
              <span className="badge-custom mb-5">Next-Level Gaming Store</span>

              <h1 className="hero-title mb-5">
                Build Your Dream
                <br />
                Gaming Setup
              </h1>

              <p className="hero-text mb-5">
                Discover premium gaming keyboards, mice, headsets, controllers,
                and accessories designed for performance, comfort, and style.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/products" className="btn btn-neon">
                  Shop Now
                </Link>

                <Link to="/about" className="btn btn-outline-neon">
                  Explore More
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="src/assets/images/Creating the Perfect Gaming Sanctuary_ Setup Tips & Tricks!.jpg"
                alt="Gaming Setup"
                className="img-fluid hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="section-title mb-2">Why Choose Us</h2>
          <p className="text-muted mb-0">
            We provide quality, performance, and support for every gamer.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-4 h-100 text-center why-card">
              <div className="why-icon mb-3">
                <LiaShippingFastSolid />
              </div>
              <h4>Fast Shipping</h4>
              <p className="text-muted">
                Get your gaming accessories delivered quickly and safely.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 h-100 text-center why-card">
              <div className="why-icon mb-3">
                <GiLayeredArmor />
              </div>
              <h4>Premium Quality</h4>
              <p className="text-muted">
                We offer top-tier products built for durability and performance.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 h-100 text-center why-card">
              <div className="why-icon mb-3">
                <IoFlashSharp />
              </div>
              <h4>Quick Support</h4>
              <p className="text-muted">
                Our support team is always ready to help you with your orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="promo-banner">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="promo-badge">Limited Offer</span>
              <h2 className="promo-title mt-3 mb-2">
                Upgrade Your Gaming Setup Today
              </h2>
              <p className="promo-text mb-0">
                Discover premium accessories with fast shipping, strong
                performance, and exclusive deals for gamers who want the best
                experience.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <Link to="/products" className="btn btn-neon">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="section-title mb-1">Featured Products</h2>
            <p className="text-muted mb-0">
              Handpicked products for gamers who want the best.
            </p>
          </div>

          <Link to="/products" className="btn btn-neon">
            View All Products
          </Link>
        </div>

        <div className="row">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-muted">No featured products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;