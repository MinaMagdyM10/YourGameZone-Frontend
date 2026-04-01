import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../utils/wishlist";
import ToastMessage from "../components/ToastMessage";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setToast({ message: "Please login first", type: "error" });

      setTimeout(() => {
        navigate("/login");
      }, 800);

      return;
    }

    loadWishlist();

    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, [navigate]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const loadWishlist = async () => {
    try {
      const items = await getWishlist();
      setWishlistItems(items);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setToast({ message: "Removed from wishlist", type: "success" });
      loadWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      setToast({ message: "Failed to remove item", type: "error" });
    }
  };

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="mb-4">
        <h1 className="fw-bold mb-2">My Wishlist</h1>
        <p className="text-muted mb-0">Your saved favorite products.</p>
      </div>

      {loading ? (
        <p className="text-center">Loading wishlist...</p>
      ) : wishlistItems.length === 0 ? (
        <div className="card p-4 text-center">
          <h4 className="mb-2">Your wishlist is empty</h4>
          <p className="text-muted mb-3">
            Save products you like and come back to them anytime.
          </p>
          <div>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/400x300?text=YourGameZone"
                  }
                  alt={product.name}
                  className="product-image"
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted mb-2">{product.brand}</p>
                  <h6 className="text-primary fw-bold mb-3">
                    ${product.price}
                  </h6>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;