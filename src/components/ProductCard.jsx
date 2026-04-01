import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleWishlist, isInWishlist } from "../utils/wishlist";
import { addToCart } from "../utils/cart";
import ToastMessage from "./ToastMessage";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [product.id]);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      checkWishlistStatus();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, [product.id]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const checkWishlistStatus = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setLiked(false);
      return;
    }

    try {
      const exists = await isInWishlist(product.id);
      setLiked(exists);
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  const handleWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setToast({
        message: "Please login first to use wishlist",
        type: "error",
      });

      setTimeout(() => {
        navigate("/login");
      }, 900);

      return;
    }

    try {
      setWishlistLoading(true);

      const added = await toggleWishlist(product);
      setLiked(added);

      setToast({
        message: added ? "Added to wishlist" : "Removed from wishlist",
        type: "success",
      });
    } catch (error) {
      console.error("Wishlist error:", error);
      setToast({ message: "Something went wrong", type: "error" });
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      await addToCart(product);
      setToast({ message: "Product added to cart", type: "success" });
    } catch (error) {
      console.error("Cart error:", error);
      setToast({ message: "Failed to add to cart", type: "error" });
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="col-md-6 mb-5 col-lg-3">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="card h-100 product-card-custom">
        <div className="product-card-image-wrapper">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/400x300?text=YourGameZone"
            }
            className="card-img-top product-image"
            alt={product.name}
          />

          <button
            className={`wishlist-btn ${liked ? "active" : ""}`}
            onClick={handleWishlist}
            title="Wishlist"
            type="button"
            disabled={wishlistLoading}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-muted mb-1">{product.brand}</p>
          <p className="fw-bold text-primary mb-3">${product.price}</p>

          <div className="mt-auto d-flex gap-2 flex-wrap">
            <Link
              to={`/products/${product.id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>

            <button
              className="btn btn-neon btn-sm"
              onClick={handleAddToCart}
              disabled={cartLoading}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;