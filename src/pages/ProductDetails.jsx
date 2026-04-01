import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../utils/cart";
import ToastMessage from "../components/ToastMessage";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      showToast("Product added to cart", "success");
    } catch (error) {
      console.error("Cart error:", error);
      showToast("Failed to add to cart", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found.</p>;
  }

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500x400?text=YourGameZone"
            }
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-6">
          <p className="text-muted mb-2">
            {product.category ? product.category.name : "No Category"}
          </p>

          <h2 className="mb-2">{product.name}</h2>
          <p className="text-muted">{product.brand}</p>

          <h4 className="text-primary fw-bold mb-3">${product.price}</h4>

          <p>{product.description}</p>

          <p className="mb-4">
            <strong>Stock:</strong> {product.stock}
          </p>

          <button className="btn btn-neon" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;