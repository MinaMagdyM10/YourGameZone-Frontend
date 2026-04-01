import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateQuantity } from "../utils/cart";
import ToastMessage from "../components/ToastMessage";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const loadCart = async () => {
    try {
      const items = await getCart();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeFromCart(item.cart_item_id || item.id);
      setToast({ message: "Removed from cart", type: "success" });
      loadCart();
    } catch (error) {
      console.error("Error removing item:", error);
      setToast({ message: "Failed to remove item", type: "error" });
    }
  };

  const handleQuantityChange = async (item, quantity) => {
    try {
      if (quantity < 1) return;
      await updateQuantity(item.cart_item_id || item.id, quantity);
      loadCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      setToast({ message: "Failed to update quantity", type: "error" });
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="mb-4">
        <h1 className="fw-bold mb-2">My Cart</h1>
        <p className="text-muted mb-0">Review your items before checkout.</p>
      </div>

      {loading ? (
        <p className="text-center">Loading cart...</p>
      ) : cartItems.length === 0 ? (
        <div className="card p-4 text-center">
          <h4 className="mb-2">Your cart is empty</h4>
          <p className="text-muted mb-3">
            Add some products and come back here.
          </p>
          <div>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card p-4">
              {cartItems.map((item) => (
                <div
                  key={item.cart_item_id || item.id}
                  className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 border-bottom py-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/100x80?text=YourGameZone"
                      }
                      alt={item.name}
                      style={{
                        width: "90px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />

                    <div>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-1">{item.brand}</p>
                      <strong className="text-primary">${item.price}</strong>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      style={{ width: "80px" }}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value))
                      }
                    />

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card p-4">
              <h4 className="mb-3">Cart Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Items</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <strong>Total Price</strong>
                <strong className="text-primary">
                  ${totalAmount.toFixed(2)}
                </strong>
              </div>

              <button
                className="btn btn-neon w-100"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;