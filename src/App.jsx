import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopButton from "./components/TopButton";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageCategories from "./pages/admin/ManageCategories";
import EditCategory from "./pages/admin/EditCategory";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Customer Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Pages */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageProducts />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <EditProduct />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageOrders />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ManageCategories />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/categories/edit/:id"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <EditCategory />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
      <TopButton />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
