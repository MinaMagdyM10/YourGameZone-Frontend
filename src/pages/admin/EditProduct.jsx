import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ToastMessage from "../../components/ToastMessage";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    status: "1",
  });

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data;

      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category_id: product.category_id || "",
        status: String(product.status ?? '1'),
      });

      setCurrentImage(product.image || "");
    } catch (error) {
      console.error("Error fetching product:", error);
      showToast("Failed to load product", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("brand", formData.brand);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("category_id", formData.category_id);
      productData.append("status", formData.status);
      productData.append("_method", "PUT");

      if (image) {
        productData.append("image", image);
      }

      await api.post(`/products/${id}`, productData);

      showToast("Product updated successfully", "success");

      setTimeout(() => {
        navigate("/admin/products");
      }, 800);
    } catch (error) {
      console.error("Error updating product:", error);

      if (error.response?.data?.message) {
        showToast(error.response.data.message, "error");
      } else if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        showToast(firstError, "error");
      } else {
        showToast("Failed to update product", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-center">Loading product...</p>;
  }

  return (
    <div className="admin-panel-card">
      {toast && <ToastMessage message={toast.message} type={toast.type} />}

      <div className="admin-page-header">
        <div>
          <h2 className="mb-1">Edit Product</h2>
          <p className="text-muted mb-0">Update your product information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              name="category_id"
              className="form-select"
              value={formData.category_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label d-block">Product Image</label>

            <label htmlFor="editImageUpload" className="custom-file-upload">
              Choose New Image
            </label>

            <input
              id="editImageUpload"
              type="file"
              name="image"
              className="d-none"
              accept="image/*"
              onChange={handleFileChange}
            />

            {image ? (
              <p className="file-name-text mt-2 mb-3">Selected: {image.name}</p>
            ) : currentImage ? (
              <p className="file-name-text mt-2 mb-3">Current image</p>
            ) : (
              <p className="file-name-text mt-2 mb-3">No image selected</p>
            )}

            <img
              src={preview || currentImage}
              alt="Product Preview"
              style={{
                width: "160px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                display: preview || currentImage ? "block" : "none",
              }}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-primary">
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-dark"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;