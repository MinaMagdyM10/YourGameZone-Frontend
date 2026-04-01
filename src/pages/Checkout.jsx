import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getCart, clearCart } from "../utils/cart";
import ToastMessage from "../components/ToastMessage";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");

      setToast({
        message: "Please login first to continue checkout",
        type: "error",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      return;
    }

    loadCart();

    setFormData((prev) => ({
      ...prev,
      customer_name: user.name || "",
      customer_email: user.email || "",
    }));
  }, [navigate]);

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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      total_amount: totalAmount,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await api.post("/orders", orderData);
      await clearCart();
      showToast("Order placed successfully", "success");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error("Checkout error:", error);
      showToast("Something went wrong while placing the order", "error");
    }
  };

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <h1 className="mb-4">Checkout</h1>

      {loading ? (
        <p className="text-center">Loading checkout...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="customer_name"
                  className="form-control"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="customer_email"
                  className="form-control"
                  value={formData.customer_email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="customer_phone"
                  className="form-control"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success">
                Place Order
              </button>
            </form>
          </div>

          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4>Order Summary</h4>
                <hr />
                {cartItems.map((item) => (
                  <div
                    key={item.cart_item_id}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <hr />
                <h5>Total: ${totalAmount.toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;