import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import ToastMessage from "../../components/ToastMessage";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchProducts();
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

  const fetchProducts = () => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        showToast("Failed to load products", "error");
      });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      showToast("Product deleted successfully", "success");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <div>
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="admin-page-header">
        <div>
          <h1 className="fw-bold mb-1">Handle Products</h1>
          <p className="text-muted mb-0">
            Manage your store products, stock, and availability.
          </p>
        </div>

        <Link to="/admin/products/add" className="btn btn-primary">
          Add New Product
        </Link>
      </div>

      <div className="admin-panel-card">
        <div className="table-responsive">
          <table className="table align-middle admin-table mb-0 admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ minWidth: "150px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>
                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/80x60?text=No+Image"
                        }
                        alt={product.name}
                        width="80"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>
                      {product.category ? product.category.name : "No Category"}
                    </td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={
                          product.status
                            ? "admin-status-badge success"
                            : "admin-status-badge inactive"
                        }
                      >
                        {product.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;