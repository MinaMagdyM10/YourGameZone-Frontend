import { useEffect, useState } from "react";
import api from "../../services/api";
import ToastMessage from "../../components/ToastMessage";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchOrders = () => {
    api
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}`, { order_status: newStatus });
      showToast("Order status updated successfully", "success");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      showToast("Failed to update order status", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/orders/${id}`);
      showToast("Order deleted successfully", "success");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      showToast("Failed to delete order", "error");
    }
  };

  return (
    <div className="container py-5">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <h1 className="mb-4">Manage Orders</h1>

      <div className="table-responsive">
        <table className="table admin-table align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_email}</td>
                  <td>{order.customer_phone}</td>
                  <td>${order.total_amount}</td>
                  <td style={{ width: "180px" }}>
                    <select
                      className="form-select"
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    {order.order_items && order.order_items.length > 0 ? (
                      <ul className="mb-0 ps-3">
                        {order.order_items.map((item) => (
                          <li key={item.id}>
                            {item.product?.name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No items"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrders;