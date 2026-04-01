import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import ToastMessage from "../../components/ToastMessage";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to load categories", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      await api.post("/categories", formData);
      showToast("Category added successfully", "success");
      setFormData({
        name: "",
        description: "",
      });
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
      showToast("Failed to add category", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);
      showToast("Category deleted successfully", "success");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      showToast("Failed to delete category", "error");
    }
  };

  return (
    <div>
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="admin-page-header">
        <div>
          <h1 className="fw-bold mb-1">Manage Categories</h1>
          <p className="text-muted mb-0">
            Add, edit, and delete product categories.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="admin-panel-card">
            <h4 className="mb-3">Add Category</h4>

            <form onSubmit={handleAddCategory}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Add Category
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="admin-panel-card">
            <h4 className="mb-3">All Categories</h4>

            <div className="table-responsive">
              <table className="table align-middle admin-table mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ minWidth: "150px" }}>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category.id}>
                        <td>#{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description || "No description"}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/admin/categories/edit/${category.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCategories;