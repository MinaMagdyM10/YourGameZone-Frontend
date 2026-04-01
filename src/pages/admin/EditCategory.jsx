import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ToastMessage from "../../components/ToastMessage";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategory();
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

  const fetchCategory = async () => {
    try {
      const response = await api.get(`/categories/${id}`);
      setFormData({
        name: response.data.name || "",
        description: response.data.description || "",
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      showToast("Failed to load category", "error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/categories/${id}`, formData);
      showToast("Category updated successfully", "success");

      setTimeout(() => {
        navigate("/admin/categories");
      }, 800);
    } catch (error) {
      console.error("Error updating category:", error);
      showToast("Failed to update category", "error");
    }
  };

  return (
    <div>
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="admin-page-header">
        <div>
          <h1 className="fw-bold mb-1">Edit Category</h1>
          <p className="text-muted mb-0">
            Update category name and description.
          </p>
        </div>
      </div>

      <div className="admin-panel-card">
        <form onSubmit={handleSubmit}>
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
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;