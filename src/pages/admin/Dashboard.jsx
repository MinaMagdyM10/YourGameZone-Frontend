import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const productsRes = await api.get("/products");
      const ordersRes = await api.get("/orders");
      const categoriesRes = await api.get("/categories");

      setProductsCount(productsRes.data.length);
      setOrdersCount(ordersRes.data.length);
      setCategoriesCount(categoriesRes.data.length);
      setLatestOrders(ordersRes.data.slice(0, 5));

      const profit = ordersRes.data.reduce(
        (sum, order) => sum + parseFloat(order.total_amount),
        0,
      );

      setTotalProfit(profit);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="fw-bold">Dashboard</h1>
        <p className="text-muted mb-0">
          Welcome back, admin. Here’s an overview of your store.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Products</div>
            <div className="admin-stat-value">{productsCount}</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Total Orders</div>
            <div className="admin-stat-value">{ordersCount}</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Categories</div>
            <div className="admin-stat-value">{categoriesCount}</div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="admin-stat-card profit-card">
            <div className="admin-stat-label">Total Profit</div>
            <div className="admin-stat-value">${totalProfit.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="admin-panel-card">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Recent Orders</h4>
        </div>

        {latestOrders.length > 0 ? (
          <div className="table-responsive">
            <table className="table align-middle admin-table mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_email}</td>
                    <td>${order.total_amount}</td>
                    <td>
                      <span className="admin-status-badge">
                        {order.order_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted mb-0">No recent orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;