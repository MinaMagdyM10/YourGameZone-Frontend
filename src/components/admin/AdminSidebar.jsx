import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-sidebar">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="admin-logo">Admin Panel</h3>

          <button
            type="button"
            className="theme-icon-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>

        <ul className="admin-menu list-unstyled mt-4">
          <li>
            <Link
              to="/admin/dashboard"
              className={isActive("/admin/dashboard") ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/products"
              className={isActive("/admin/products") ? "active" : ""}
            >
              Handle Products
            </Link>
          </li>

          <li>
            <Link
              to="/admin/products/add"
              className={isActive("/admin/products/add") ? "active" : ""}
            >
              Add Product
            </Link>
          </li>

          <li>
            <Link
              to="/admin/categories"
              className={isActive("/admin/categories") ? "active" : ""}
            >
              Categories
            </Link>
          </li>

          <li>
            <Link
              to="/admin/orders"
              className={isActive("/admin/orders") ? "active" : ""}
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>

      <button className="admin-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;